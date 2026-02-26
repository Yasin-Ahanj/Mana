"use client";
import Image from "next/image"
import fingers from "@/public/Images/footer/fingers.png"
import Fani from "@/public/Images/footer/fani.png"
const Footer = () => {

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center lg:flex-row-reverse lg:justify-evenly lg:items-center">
            <div className="flex flex-col items-center gap-8 ">
                <span className="nastaliqFont text-[3em]">
                    نرم افزاری برای آموزش
                </span>
                <span onClick={goToTop} className="border flex justify-center items-center border-[#F89535] hover:cursor-pointer rounded-full w-[300px] h-[50px]">
                    برو بالا
                </span>
            </div>

            <Image src={fingers} alt="mana learn" className="lg:w-1/5" />
        </div>
    )
}
export default Footer