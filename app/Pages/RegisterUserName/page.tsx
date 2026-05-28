"use client"
import LineOfBreakLinks from "@/app/Components/LineOfBreakLinks/page";
import NavbarLogin from "@/app/Components/NavbarLogin/page";
import TextInput from "@/app/Components/TextInput/page";
import Image from "next/image";
import Mana from "@/public/Images/Login/leftPic.jpg"
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import PasswordInput from "@/app/Components/PasswordInput/page";
import CryptoJS from "crypto-js";

const RegisterUserName = () => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const from = useSearchParams().get('from');
    const passwordRegex = /^.{8,}$/


    const sendMobileNumber = async () => {
        if (passwordRegex.test(password)) {
            const res = await fetch("http://127.0.0.1:8000/api/v1/autenticate-username", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            const data = await res.json();
            if (res.status === 201) {
                const encryptedToken = CryptoJS.AES.encrypt(data.token, "mana").toString();
                localStorage.setItem("token", encryptedToken);
                router.push(`/Pages/Home`);
            } else if (res.status === 409) {
                toast.error("این نام کاربری قبلا ثبت شده ، لطفا نام کاربری دیگری وارد نمایید")
            } else {
                toast.error("خطای سرور ، با پشتیبان در ارتباط باشید")
            }
        } else {
            toast.error("رمز وارد شده حداقل باید 8 کاراکتر باشد")

        }




    }

    return (
        <div>

            <NavbarLogin />
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
            <div className="lg:flex  lg:items-center lg:h-[85vh] lg:w-[90%] lg:items-center lg:mt-5 lg:mx-auto  lg:bg-[#F4F4F4] lg:rounded-[20px] lg:overflow-hidden">
                <div className="hidden lg:block h-full w-[90%] relative">
                    <div className="bg-[#000]/50 w-[80%] h-full absolute flex flex-col justify-center items-center text-[#fff] gap-4">
                        <span dir="rtl" className="xl:text-[2em] lg:text-[1.5em]">
                            💡 مارک زاکربرگ
                        </span>
                        <p dir="rtl" className="xl:w-[70%] lg:w-[100%] text-center xl:text-[24px] lg:text-[18px]">
                            «برنامه‌نویسی به تو این توانایی را می‌دهد که دنیا را تغییر بدهی، نه فقط در موردش حرف بزنی.»
                        </p>
                    </div>
                    <Image className="h-[100%] w-[80%] rounded-l-[20px]" src={Mana} alt="مانا" loading="lazy" priority={false} />
                </div>
                <div className=" lg:h-[100%]">
                    <div dir="rtl" className="flex w-[80%] mx-auto mt-4 flex-col align-center ">
                        <span className="text-[#000]">ساخت حساب کاربری</span>
                        <span className="text-[#000]/50 mt-1">یادگیری آسان برای علاقه مندان به مهارت های فنی حرفه ای ، همراه با اساتید مجرب حوزه دلخواه شما.</span>
                    </div>
                    <TextInput containerStyle="flex flex-col gap-1 items-end w-[80%] mx-auto mt-4" value={username} onChange={(e) => setUsername(e.target.value)} labelTxt="نام کاربری" name="username" placeholder="" style="w-[100%] text-center mt-2 border-[1px] h-[57px] rounded-[12px]" />
                    <PasswordInput containerStyle="flex flex-col gap-1 items-end w-[80%] mx-auto mt-4" value={password} onChange={(e) => setPassword(e.target.value)} labelTxt="رمز عبور" name="password" placeholder="" style="w-[100%] text-center mt-2 border-[1px] h-[57px] rounded-[12px]" />
                    <button className="w-[80%] block mx-auto bg-[#F89535] mt-4 h-[57px] text-[#fff] text-[2em] rounded-[12px] hover:cursor-pointer" onClick={sendMobileNumber}>
                        دریافت کد
                    </button>
                    <Link href="/Pages/LoginPasscode" className=" my-4 lg:my-[8px] block  mx-auto w-[80%] underline text-[#0D18EF] text-right">قبلا ثبت نام کرده اید؟ وارد شوید</Link>
                    <hr className="mt-8 lg:mt-2" />
                    <div className="flex flex-col text-justify w-[80%] mx-auto gap-4 my-8  lg:my-0 lg:gap-0 text-[#000]/50">
                        <p dir="rtl">
                            در صورتی که در روند وارد شدن به حساب کاربری مشکلی داشتید با شماره پشتیبانی زیر تماس برقرار کنید.
                        </p>
                        <span className="text-left mb-5 underline">
                            09143411466
                        </span>
                        <p dir="rtl">
                            این وبسایت مجهز بـه ربـات هـایی بـرای ردیـابی افـراد سود جو غیر اخلاقی اسـت ، لطفا در نحوه برخورد با نرم افزار دقت لازم را داشته باشید.
                        </p>
                        <p dir="rtl">
                            اطلاعات آموزش خود را در اختیار هیچ شخص سومی قرار ندهید . شخص سوم اعم از دوستان و افراد نزدیک و کافی نت ها و ...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default RegisterUserName;