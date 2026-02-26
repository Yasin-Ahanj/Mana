"use client";
import LineOfBreakLinks from "@/app/Components/LineOfBreakLinks/page";
import NavbarLogin from "@/app/Components/NavbarLogin/page";
import TextInput from "@/app/Components/TextInput/page";
import Image from "next/image";
import Mana from "@/public/Images/Login/leftPic.jpg"
import { ArrowLeft, ArrowLeft2 } from "iconsax-reactjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import CryptoJS from "crypto-js";

const Login = () => {
    const pathname = useSearchParams().get("from");
    const router = useRouter();
    const [otpCode, setOtpCode] = useState("");
    const [mobile, setMobile] = useState("");
    const [isAllowToResend, setIsAllowToResend] = useState(false);
    const [remainingTime, setRemainingTime] = useState(120);
    useEffect(() => {
        setMobile(localStorage.getItem("mobile") ?? "");
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        // Pad with leading zero if needed
        const formattedMins = mins.toString().padStart(2, '0');
        const formattedSecs = secs.toString().padStart(2, '0');
        return `${formattedMins}:${formattedSecs}`;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (remainingTime === 0) {
                setIsAllowToResend(true);
                clearInterval(interval);
            } else {
                setRemainingTime(remainingTime - 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [remainingTime]);


    const sendMobileNumber = async () => {
        if (isAllowToResend) {
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
                setRemainingTime(120);
            } else if (res.status === 429) {
                toast.error("شما اخیرا کد ارسالی داشتید لطفا بعد از 2 دقیقه مجدد تلاش کنید")
            } else {
                toast.error("اطلاعات وارد شده نادرست است لطفا دوباره تلاش کنید")
            }
        } else {
            toast.error(`شما اخیرا کد ارسالی داشتید لطفا بعد از ${formatTime(remainingTime)}  مجدد تلاش کنید`)
        }

    }

    const SendOtpCode = async () => {
        if (pathname == "Consulting") {
            let gender = localStorage.getItem("gender") ?? 1
            let name = localStorage.getItem("name") ?? "کاربر"
            const res = await fetch("http://127.0.0.1:8000/api/v1/setConsulting", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mobile: mobile,
                    otpCode: otpCode,
                    name: name,
                    gender: gender
                })
            })

            const data = await res.json();
            console.log(data)
        } else {
            const res = await fetch("http://127.0.0.1:8000/api/v1/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mobile: mobile,
                    otp_code: otpCode,
                }),
            });
            const data = await res.json();

            if (res.status === 401) {
                toast.error("کد پیامک شده نادرست است لطفا دوباره تلاش کنید")
            } else if (res.status === 201) {
                const encryptedToken = CryptoJS.AES.encrypt(data.token, "mana").toString();
                localStorage.setItem("token", encryptedToken);

                if (pathname != "null") {
                    router.push(pathname ?? "/");
                } else {
                    router.push("/");
                }
            }
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
                rtl={true} // since your text is Persian
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
                    <Image className="h-[100%] w-[80%] rounded-l-[20px]" src={Mana} alt="مانا" />
                </div>
                <div>
                    <div dir="rtl" className="flex w-[80%] mx-auto mt-4 flex-col align-center ">
                        <span className="text-[#000]">ورود یا ساخت حساب کاربری</span>
                        <span className="text-[#000]/50 mt-1">یادگیری آسان برای علاقه مندان به مهارت های فنی حرفه ای ، همراه با اساتید مجرب حوزه دلخواه شما.</span>
                    </div>

                    <div className="flex items-center w-4/5 mx-auto mt-4 justify-end hover:cursor-pointer" onClick={() => router.push("/Pages/Login")}>
                        <ArrowLeft size={16} color="#F89535" />
                        <span className="text-[#F89535]">تغییر شماره موبایل</span>
                    </div>
                    <TextInput containerStyle="flex flex-col gap-1 items-end w-[80%] mx-auto mt-4" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} labelTxt="کد پیامک شده" name="otp_code" placeholder="12345" style="w-[100%] text-center mt-2 border-[1px] h-[57px] rounded-[12px]" />
                    <button className="w-[80%] block mx-auto bg-[#F89535] mt-4 h-[57px] text-[#fff] text-[2em] rounded-[12px] hover:cursor-pointer" onClick={SendOtpCode}>
                        ثبت کد
                    </button>
                    <p dir="rtl" className="text-[#000]/50 w-4/5 mx-auto text-right mt-1">
                        پیامکی به شماره موبایل {mobile} ارسال شده ، لطفا کد پیامک شده را وارد نمایید.
                    </p>
                    <div className="text-right block w-4/5 mx-auto mt-4 text-[#F89535] text-[16px] flex flex-row-reverse gap-4 justify-start">
                        <span className={remainingTime == 0 ? 'cursor-pointer' : `line-through`} onClick={sendMobileNumber}>
                            ارسال مجدد کد
                        </span>
                        <span className={remainingTime == 0 ? 'hidden' : `inline`}>
                            {formatTime(remainingTime)}
                        </span>
                    </div>
                    <hr className="mt-12" />
                    <div className="flex flex-col text-start w-[80%] mx-auto gap-4 my-8 text-[#000]/50">
                        <p dir="rtl">
                            در صورتی که در روند وارد شدن به حساب کاربری مشکلی داشتید با شماره پشتیبانی زیر تماس برقرار کنید.
                        </p>
                        <span className="text-left mb-5 underline">
                            09143411466
                        </span>
                        <p dir="rtl">
                            این وبسایت مجهز بـه ربـات هـایی بـرای ردیـابی افـراد سـود جو غیر اخلاقی اسـت ، لطفا در نحوه برخورد با نرم افزار دقت لازم را داشته باشید.
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