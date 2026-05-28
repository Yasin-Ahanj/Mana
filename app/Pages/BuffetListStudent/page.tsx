"use client"
import { useEffect, useState } from "react"
import CryptoJS from "crypto-js";
import Link from "next/link";
import { Trash } from "iconsax-reactjs";
import Navbar from "@/app/Components/Navbar/page";
import CourseBoxInList from "@/app/Components/CourseBoxInList/page";
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "@/app/Components/Skeleton/Skeleton";
import ArticleBoxInList from "@/app/Components/ArticleBoxInList/page";
import BuffetItemBox from "@/app/Components/BuffetItemBox/page";
import { useRouter } from "next/navigation";
interface Buffet {
    id: number;
    name: string;
    price: string;
}
interface ApiResponse {
    buffet: Buffet[];
}
const BuffetListStudent = () => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const navigate = useRouter();

    const getToken = () => {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedToken, "mana");
        return bytes.toString(CryptoJS.enc.Utf8);
    };
    const fethData = async (token: string) => {

        const res = await fetch("http://127.0.0.1:8000/api/v1/buffetListStudent", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },

        });

        const result = await res.json();

        console.log(result)

        setData(result);
    }

    useEffect(() => {
        const token = getToken()
        fethData(token)
    }, [])

    const [selectedItems, setSelectedItems] = useState<{ id: number; count: number }[]>([]);

    const handleItemChange = (id: number, count: number) => {
        setSelectedItems(prev => {
            const exists = prev.find(item => item.id === id);

            if (exists) {
                if (count === 0) {
                    // remove item if count is 0
                    return prev.filter(item => item.id !== id);
                }
                return prev.map(item =>
                    item.id === id ? { ...item, count } : item
                );
            } else {
                return [...prev, { id, count }];
            }
        });
    };


    const handleBuy = async () => {
        const token = getToken();

        // flatten counts into repeated ids if needed
        const buffets = selectedItems.flatMap(item =>
            Array(item.count).fill({ id: item.id })
        );

        const res = await fetch("http://127.0.0.1:8000/api/v1/buyItemBuffet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                buffets: JSON.stringify(buffets),
            }),
        });

        const result = await res.json();
        toast.success("خرید شما انجام شد")
        navigate.push("/")
        
    };

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName="my-toast"
            />
            <Navbar />

            {
                data ? (
                    <div className="grid grid-cols-1 w-[90%] mx-auto mt-8 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {
                            data.map((item: any) => (
                                <BuffetItemBox key={item.id} item={item} onChange={handleItemChange} />
                            ))
                        }
                    </div>
                ) : (
                    <div className="flex gap-4 flex-col mx-auto  justify-center items-center w-[90%] my-8">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="w-[100%] h-[100px] rounded-[20px]" />
                        ))}
                    </div>
                )
            }

            <button className="w-[30%]  mx-auto block mt-8 py-4 rounded-lg bg-[#F89535] text-[#fff] hover:cursor-pointer" onClick={handleBuy}>
                خرید
            </button>

        </div>
    )
}
export default BuffetListStudent