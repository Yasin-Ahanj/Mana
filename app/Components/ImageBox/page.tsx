"use client"
import Image from "next/image";

type ImageBoxProps = {
    slug: string;
    alt: string;
    class: string;
}

const ImageBox = ({ slug, alt, class: className }: ImageBoxProps) => {
    return (
        <div className={`relative  ${className}`}>
            <Image
                src={slug}
                alt={alt}
                fill
                className={` rounded-lg`}
                unoptimized
            />
        </div>
    )
}
export default ImageBox