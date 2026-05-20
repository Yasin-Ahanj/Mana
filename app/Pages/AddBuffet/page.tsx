"use client"
import Navbar from "@/app/Components/Navbar/page"
import NumberInput from "@/app/Components/NumberInput/page"
import TextInput from "@/app/Components/TextInput/page"
import { useState } from "react"
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify"
import Footer from "@/app/Components/Footer/page"

const AddBuffet = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")

    const getToken = () => {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedToken, "mana");
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    const addItem = async () => {
        try {
            const token = getToken();
            const res = await fetch("http://127.0.0.1:8000/api/v1/store-buffet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: name,
                    price: price
                }),
            });

            if (res.status == 200) {

                toast.success("آیتم با موفقیت افزوده شد")
            } else {
                toast.error("مشکلی در افزودن دوره وجود دارد")

            }
        } catch (error) {
            toast.error("مشکلی در افزودن دوره وجود دارد")

            console.error("Submit error:", error);
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
                <button className="w-[20%] block mx-auto border mt-8 py-4 rounded-[18px] bg-[#F89535] text-[#fff] hover:cursor-pointer shadow-lg" onClick={addItem}>
                    ذخیره
                </button>
            </div>
            <Footer />
        </div>
    )
}
export default AddBuffet