"use client"
import Image, { StaticImageData } from "next/image";

type Props = {
    name: string;
    image: StaticImageData;
    comment: string;
};

const Comment = ({ name, image, comment }: Props) => {
    return (
        <div className="border-1 rounded-[12px] border-[#000]/30 flex flex-col items-start p-8 h-fit">
            <div className="flex flex-row-reverse mb-4 items-center gap-4">
                <span className="text-[000] text-[1em] font-bold">{name}</span>
                <Image src={image} alt="mana learn" />
            </div>
            <p dir="rtl" className=" text-[#000]/50 h-fit text-justify indent-4">
                {comment}
            </p>
        </div>
    );
}
export default Comment;