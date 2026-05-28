"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "@/app/Components/Navbar/page";
import TextInput from "@/app/Components/TextInput/page";
import NumberInput from "@/app/Components/NumberInput/page";
import Footer from "@/app/Components/Footer/page";

const BuffetItem = () => {
    const params = useParams<{ id: string }>();
    const itemID = params.id;

    const navigate = useRouter()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")

    const getToken = () => {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedToken, "mana");
        return bytes.toString(CryptoJS.enc.Utf8);
    };


    const fetchData = async (token: any): Promise<any> => {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/buffet/${itemID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await res.json();

        setPrice(result.price)
        setName(result.name)
        console.log(result)
    }

    useEffect(() => {
        const token = getToken()

        fetchData(token)
    }, [])


    const updateItem = async () => {
        let token = getToken()
        const res = await fetch(`http://127.0.0.1:8000/api/v1/update-buffet/${itemID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                price: price,
                name: name
            }),
        });

        if(res.status == 200){
            toast.success("ویرایش انجام شد")
            navigate.push("/Pages/BuffetListManager")

        }else{
            toast.error("ویرایش بوفه با مشکل مواجه شد")
        }
    }

    return (
        <div >
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
            <div className="flex flex-col justify-center h-[80vh]">
                <TextInput
                    containerStyle="flex flex-col gap-1 items-end w-[50%] mx-auto mt-4"
                    placeholder="نام محصول"
                    style="w-full border text-right p-4 rounded-[12px]"
                    labelTxt="نام محصول"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <NumberInput
                    containerStyle="flex flex-col gap-1 items-end w-[50%] mx-auto mt-4"
                    placeholder="مبلغ"
                    style="w-full border text-right p-4 rounded-[12px]"
                    labelTxt="مبلغ"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />
                <button className="w-[20%] block mx-auto border mt-8 py-4 rounded-[18px] bg-[#F89535] text-[#fff] hover:cursor-pointer shadow-lg" onClick={updateItem}>
                    ذخیره
                </button>
            </div>
            <Footer />
        </div>
    )

}
export default BuffetItem