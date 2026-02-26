"use client"
import { useRouter } from "next/navigation";
const NeedConsulting = () => { 
    const navigate = useRouter();
    const moveToConsultingPage = () => {
        navigate.push("/Pages/Consulting")
    }
    return (
        <>
            <span className="text-center block my-4 text-lg font-semibold">نیاز به مشاوره داری؟</span>
            <div className="h-[74px] w-[80%] hover:cursor-pointer lg:h-[100px] bg-gradient-to-r from-[#FF7E00]/50 to-[#BF4C4C]/50 mx-auto mt-4 flex justify-center items-center rounded-[20px] p-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]" onClick={moveToConsultingPage}>
                <span className="text-[16px] md:text-[24px] text-[#000] font-bold">
                    ثبت نام برای دریافت مشاوره رایگان
                </span>
            </div>
        </>

    );
};

export default NeedConsulting;