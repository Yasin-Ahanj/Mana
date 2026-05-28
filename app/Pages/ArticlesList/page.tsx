"use client"
import { useEffect, useState } from "react"
import CryptoJS from "crypto-js";
import Link from "next/link";
import { Trash } from "iconsax-reactjs";
import Navbar from "@/app/Components/Navbar/page";
import CourseBoxInList from "@/app/Components/CourseBoxInList/page";
import { ToastContainer } from "react-toastify";
import Skeleton from "@/app/Components/Skeleton/Skeleton";
import ArticleBoxInList from "@/app/Components/ArticleBoxInList/page";
interface Article {
    id: number;
    name: string;
    slug: string;
}
interface ApiResponse {
    articles: Article[];
}
const ArticlesList = () => {
    const [data, setData] = useState<ApiResponse | null>(null);

    const getToken = () => {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedToken, "mana");
        return bytes.toString(CryptoJS.enc.Utf8);
    };
    const fethData = async (token: string) => {

        const res = await fetch("http://127.0.0.1:8000/api/v1/get-all-articles", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },

        });

        const result = await res.json();


        setData(result);
    }

    useEffect(() => {
        const token = getToken()
        fethData(token)
    }, [])
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
                    <div className="flex flex-col justify-center items-center gap-4 mt-8">
                        {
                            data?.articles.map((course) => (
                                <ArticleBoxInList key={course.id} data={course} />
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

        </div>
    )
}
export default ArticlesList