"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import Navbar from "@/app/Components/Navbar/page";
import Footer from "@/app/Components/Footer/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Snack {
    snackname: string;
    snackprice: number;
    snackid: number;
}

interface GroupedSnack {
    snackname: string;
    snackid: number;
    quantity: number;
    totalPrice: number;
}

const UnPayedBuffet = () => {
    const params = useParams<{ id: string }>();
    const [groupedData, setGroupedData] = useState<GroupedSnack[]>([]);
    const [allMoney, setAllMoney] = useState<number>(0);
    const navigate = useRouter()

    const getToken = () => {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedToken, "mana");
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    const fetchData = async (token: any) => {
        try {
            const res = await fetch(
                `http://127.0.0.1:8000/api/v1/unpayed-buffets/${params.id}`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data: Snack[] = await res.json();

            // Group by snackid
            const grouped: { [key: number]: GroupedSnack } = {};
            data.forEach((item) => {
                if (grouped[item.snackid]) {
                    grouped[item.snackid].quantity += 1;
                    grouped[item.snackid].totalPrice += item.snackprice;
                } else {
                    grouped[item.snackid] = {
                        snackname: item.snackname,
                        snackid: item.snackid,
                        quantity: 1,
                        totalPrice: item.snackprice,
                    };
                }
            });

            const groupedArray = Object.values(grouped);
            setGroupedData(groupedArray);

            // Calculate total
            const total = groupedArray.reduce((acc, item) => acc + item.totalPrice, 0);
            setAllMoney(total);
        } catch (err) {
            toast.error("خطا در دریافت اطلاعات ❌");
        }
    };

    useEffect(() => {
        let token = getToken();
        fetchData(token);
    }, []);

    const payUnPayedSnacks = async () => {
        let token = getToken();

        const res = await fetch(`http://127.0.0.1:8000/api/v1/pay-unpayed/${params.id}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            })

        if (res.status == 200) {
            toast.success("پرداخت انجام شد")
            navigate.push("/Pages/ListBuffetBought")
        } else {
            toast.error("مشکلی در پرداخت وجود دارد")

        }


    }


    return (
        <div className="p-4">
            <Navbar />
            <ToastContainer position="top-center" rtl autoClose={3000} />

            <div className="overflow-x-auto mt-8 min-h-[60vh]">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">تعداد</th>
                            <th className="border px-4 py-2">قیمت</th>
                            <th className="border px-4 py-2">نام محصول</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedData.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 text-center">{item.quantity}</td>
                                <td className="border px-4 py-2 text-center">{item.totalPrice.toLocaleString()}</td>
                                <td className="border px-4 py-2 text-center">{item.snackname}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 text-right font-bold">
                    جمع کل قابل پرداخت: {allMoney.toLocaleString()} تومان
                </div>
                <div className="w-[30%] py-4 flex justify-center items-center mx-auto hover:cursor-pointer bg-[#F89535] rounded-full" onClick={payUnPayedSnacks}>
                    پرداخت
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UnPayedBuffet;