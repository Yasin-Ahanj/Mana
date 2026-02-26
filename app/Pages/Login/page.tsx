"use client"
import LineOfBreakLinks from "@/app/Components/LineOfBreakLinks/page";
import NavbarLogin from "@/app/Components/NavbarLogin/page";
import TextInput from "@/app/Components/TextInput/page";
import Image from "next/image";
import Mana from "@/public/Images/Login/leftPic.jpg"
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
    const router = useRouter();
    const [mobile, setMobile] = useState("");
    const from = useSearchParams().get('from');
    const mobileRegex = /^(?:\+98|0098|98|0)?9\d{9}$/


    const sendMobileNumber = async () => {
        if (mobileRegex.test(mobile)) {
            const res = await fetch("http://127.0.0.1:8000/api/v1/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mobile: mobile,
                }),
            });
            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem("mobile", mobile);
                router.push(`/Pages/SendOtpCode?from=${from}`);
            } else if (res.status === 429) {
                toast.error("شما اخیرا کد ارسالی داشتید لطفا بعد از 2 دقیقه مجدد تلاش کنید")
            } else {
                toast.error("اطلاعات وارد شده نادرست است لطفا دوباره تلاش کنید")
            }
        }else{
                toast.error("اطلاعات وارد شده نادرست است لطفا دوباره تلاش کنید")

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
            <div className="lg:flex  lg:h-[85vh] lg:w-[90%] lg:items-center lg:mt-5 lg:mx-auto  lg:bg-[#F4F4F4] lg:rounded-[20px] lg:overflow-hidden">
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
                <div>
                    <div dir="rtl" className="flex w-[80%] mx-auto mt-4 flex-col align-center ">
                        <span className="text-[#000]">ورود یا ساخت حساب کاربری</span>
                        <span className="text-[#000]/50 mt-1">یادگیری آسان برای علاقه مندان به مهارت های فنی حرفه ای ، همراه با اساتید مجرب حوزه دلخواه شما.</span>
                    </div>
                    <TextInput containerStyle="flex flex-col gap-1 items-end w-[80%] mx-auto mt-4" value={mobile} onChange={(e) => setMobile(e.target.value)} labelTxt="شماره موبایل" name="mobile" placeholder="09123456789" style="w-[100%] text-center mt-2 border-[1px] h-[57px] rounded-[12px]" />
                    <button className="w-[80%] block mx-auto bg-[#F89535] mt-4 h-[57px] text-[#fff] text-[2em] rounded-[12px] hover:cursor-pointer" onClick={sendMobileNumber}>
                        دریافت کد
                    </button>
                    <hr className="mt-12" />
                    <div className="flex flex-col text-justify w-[80%] mx-auto gap-4 my-8 text-[#000]/50">
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
export default Login;