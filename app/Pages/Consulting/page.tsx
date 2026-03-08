"use client"
import NavbarLogin from "@/app/Components/NavbarLogin/page"
import SelectBox from "@/app/Components/SelectBox/page";
import TextInput from "@/app/Components/TextInput/page"
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const Consulting = () => {
    const router = useRouter();

    const [mobile, setMobile] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("1");
    const mobileRegex = /^(?:\+98|0098|98|0)?9\d{9}$/

    const from = "Consulting";

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
                localStorage.setItem("name", name);
                localStorage.setItem("gender", gender);
                localStorage.setItem("mobile", mobile);
                router.push(`/Pages/SendOtpCode?from=${from}`);
            } else if (res.status === 429) {
                toast.error("شما اخیرا کد ارسالی داشتید لطفا بعد از 2 دقیقه مجدد تلاش کنید")
            } else {
                toast.error("اطلاعات وارد شده نادرست است لطفا دوباره تلاش کنید")
            }
        } else {
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
            <div className="w-[95%] mx-auto mt-2 flex items-end flex-col gap-2">
                <h1 className="text-right">ثبت زمان مشاوره رایگان</h1>
                <p className="text-right text-[#000]/50" dir="rtl">
                    همکاران ما در اسرع وقت با شما تماس خواهند گرفت و مشاوره لازم را خواهند داد.
                </p>
                <TextInput containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4" placeholder="09123456789" style="w-full border text-center p-4 rounded-[12px]" labelTxt="شماره موبایل برای مشاوره تلفنی رایگان" name="phone" onChange={(e) => setMobile(e.target.value)} value={mobile} />
                <TextInput containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4" placeholder="نام و نام خانوادگی شما" style="w-full  border text-center p-4 rounded-[12px]" labelTxt="نام و نام خانوادگی شما" name="name" onChange={(e) => setName(e.target.value)} value={name} />

                <SelectBox
                    options={[
                        { value: "1", label: "مرد" },
                        { value: "2", label: "زن" }
                    ]}
                    onChange={(e) => setGender(e.target.value)}
                    value={mobile}
                    style="w-[100%] border p-4 appearance-none text-center rounded-[12px]"
                    label="جنسیت"
                    name="gender"
                    containerStyle="flex w-[50%] mr-[5%] flex-col  items-end gap-1 mt-4 relative "
                    isNessesary={true}
                    optionsStyle="rounded-[12px]"
                />

                <button className="w-[90%] block mx-auto bg-[#F89535] mt-4 h-[57px] text-[#fff] text-[2em] rounded-[12px] hover:cursor-pointer" onClick={sendMobileNumber}>
                    دریافت کد
                </button>
                <hr className="mt-12" />
                <div className="flex flex-col text-justify w-[90%] mx-auto gap-4 my-8 text-[#000]/50">
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
                        اطلاعات آموزش خود را در اختیار هیچ شخص سومی قرار ندهید .شخص سوم اعم از دوستان و افراد نزدیک و کافی نت ها و ...
                    </p>
                </div>
                </div>
            
</div> 
            )
               

}
export default Consulting