"use client";

import Image from "next/image";
import Logo from "@/public/Images/navbar/logo.png";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "iconsax-reactjs";
const NavbarPersonalInfo = () => {
    const router = useRouter();
    const handleBack = () => {
        router.push("/");
    };
    return (
        <div className="grid grid-cols-3 items-center h-[72px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
            <div className="flex col-start-1  justify-center items-center gap-2 pr-6 hover:cursor-pointer">
                <ArrowLeft 
                    size={16}
                    color="#808080"
                    />
                <span className="text-[#808080]">
                    بازگشت
                </span>
            </div>
            <div onClick={() => router.push("/")} className="flex col-start-3 justify-center items-center gap-4 hover:cursor-pointer">
                <h1 className="text-[36px] text-[#48484D]">مــانـا</h1>
                <Image src={Logo} alt="آموزشگاه مانا" className="w-[51px] h-[51px]" />
            </div>

        </div>
    )
};

export default NavbarPersonalInfo;
