"use client"
import { useEffect, useState } from "react"
import CryptoJS from "crypto-js";
import Navbar from "@/app/Components/Navbar/page";
import Footer from "@/app/Components/Footer/page";
import Link from "next/link";

type BuffetItem = {
    username: string;
    user_id: number;
};

type BuffetData = {
    payed: BuffetItem[];
    unPayed: BuffetItem[];
};

const ListBuffetBought = () => {
    const [data, setData] = useState<BuffetData | null>(null);
    const [isPayed, setIsPayed] = useState<boolean>(false);

    const fethData = async (token: string | null) => {
        if (!token) return;
        const res = await fetch("http://127.0.0.1:8000/api/v1/list-buffet-bought", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        console.log(result.unPayed);
        setData(result);
    }

    const getToken = () => {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedToken, "mana");
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    useEffect(() => {
        let token = getToken()
        fethData(token)
    }, [])

    return (
        <div>
            <Navbar />
            <div className="flex w-[90%] mx-auto gap-8 justify-around mt-8">
                <div
                    className={`w-[30%] py-4 flex justify-center items-center hover:cursor-pointer rounded-full ${isPayed ? 'bg-[#F89535]' : 'bg-white border'}`}
                    onClick={() => setIsPayed(true)}
                >
                    پرداخت شده
                </div>
                <div
                    className={`w-[30%] py-4 flex justify-center items-center hover:cursor-pointer rounded-full ${!isPayed ? 'bg-[#F89535]' : 'bg-white border'}`}
                    onClick={() => setIsPayed(false)}
                >
                    پرداخت نشده
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center w-[90%] mx-auto mt-8 min-h-[100vh]">
                {isPayed
                    ? data?.payed.map((item, index) => (
                        <Link href={`/Pages/PayedBuffet/${item.user_id}`} key={index} className="border w-[100%] border-[#F89535] flex justify-center items-center py-8 rounded-full h-[100px]">
                            <span>{item.username}</span>
                        </Link>
                    ))
                    : data?.unPayed.map((item, index) => (
                        <Link  href={`/Pages/UnPayedBuffet/${item.user_id}`} key={index} className="border w-[100%] border-[#F89535] flex justify-center items-center py-8 rounded-full h-[100px]">
                            <span>{item.username}</span>
                        </Link>
                    ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default ListBuffetBought;