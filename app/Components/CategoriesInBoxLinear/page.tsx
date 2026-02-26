"use client";
import Image , { StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
    text : string;
    image : StaticImageData;
    link : string;
};


const CategoriesInBoxLinear = ({ text, image , link } : Props) => {
    return (
        <Link href={link} className="h-[61px] md:h-[86px] bg-gradient-to-br from-[#F84535]/50 to-[#F89535]/50 rounded-[12px] relative flex md:gap-4 items-center justify-center">
            <Image src={image} alt="image" className="rounded-[20px] absolute top-0 left-0 h-[32px] w-[32px] md:static  mt-[-0.5em] ml-[-0.1em]" /> 
            <span className="lg:text-[24px]">{text}</span>
        </Link>
    );
};

export default CategoriesInBoxLinear;