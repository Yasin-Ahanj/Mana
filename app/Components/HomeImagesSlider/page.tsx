"use client"
import SliderSwiper from "../SliderSwiper/page";
import codingDesk from "@/public/Images/Hero/coding-desk.jpg";
import takhfif from "@/public/Images/Hero/takhfif.jpg";
import takhfifDesk from "@/public/Images/Hero/takhfif-desk.jpg";
import coding from "@/public/Images/Hero/coding.jpg";
import ai from "@/public/Images/Hero/AI.jpg";
import aiDesk from "@/public/Images/Hero/ai-desk.jpg";

const HomeImagesSlider = () => {

    const sliderData = [
        [
            {
                id: 1,
                url: "/Categories/Free",
                image: takhfif,
            },
            {
                id: 2,
                url: "/MainCategories/AI",
                image: ai,
            },
            {
                id: 3,
                url: "/MainCategories/Coding",
                image: coding,
            },
        ],
        [
            {
                id: 1,
                url: "/Categories/Free",
                image: takhfifDesk,
            },
            {
                id: 2,
                url: "/MainCategories/AI",
                image: aiDesk,
            },
            {
                id: 3,
                url: "/MainCategories/Coding",
                image: codingDesk,
            },
        ]

    ];



    return (
        <div className="px-4 mt-6">
            <SliderSwiper data={sliderData} />
        </div>
    );
};

export default HomeImagesSlider;    