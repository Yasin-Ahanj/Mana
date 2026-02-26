"use client";

import Image from "next/image";
import Logo from "@/public/Images/navbar/logo.png";
import { CloseCircle } from "iconsax-reactjs";
import { useRouter } from "next/navigation";

const NavbarLogin = () => {
    const router = useRouter();
    const handleBack = () => {
        router.push("/");
    };
    return (
        <div className="grid grid-cols-3 items-center h-[72px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
            <div onClick={() => router.push("/")} className="flex col-start-2 justify-center items-center gap-4 hover:cursor-pointer">
                <h1 className="text-[36px] text-[#48484D]">مــانـا</h1>
                <Image src={Logo} alt="آموزشگاه مانا" className="w-[51px] h-[51px]" />
            </div>

            <div className="flex col-start-3 justify-end pr-6">
                <CloseCircle
                    onClick={handleBack} // goes back one step in history
                    size={32}
                    color="#48484D"
                    className="hover:cursor-pointer"
                />
            </div>
        </div>
    )
};

export default NavbarLogin;
