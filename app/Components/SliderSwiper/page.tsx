"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

type SliderItem = {
    id: number;
    url: string;
    image: StaticImageData;
};

interface Props {
    data: SliderItem[][];
}

const SliderSwiper = ({ data }: Props) => {
    return (
        <>
            <div className="lg:hidden">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    spaceBetween={16}
                    slidesPerView={1.2}
                    loop={true}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                    }}
                    className="w-full flex flex-row-reverse "
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    dir="rtl"
                >
                    {data[0].map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="bg-[#E5E5E5] rounded-[20px] flex flex-col items-center justify-center h-[220px]">
                                <Link href={item.url} className="w-full h-full relative ">
                                    <Image
                                        src={item.image}
                                        alt="مانا"
                                        className=" w-full h-full rounded-[18px]"
                                        fill
                                        loading="lazy"
                                        priority={false}
                                    />
                                </Link>

                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>
            <div className="hidden lg:block">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    spaceBetween={16}
                    slidesPerView={1.2}
                    loop={true}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                    }}
                    className="w-full flex flex-row-reverse "
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    dir="rtl"
                >
                    {data[1].map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="bg-[#E5E5E5] rounded-[20px] flex flex-col items-center justify-center h-[220px]">
                                <Link href={item.url} className="w-full h-full relative ">
                                    <Image
                                        src={item.image}
                                        alt="مانا"
                                        className=" w-full h-full rounded-[18px]"
                                        fill
                                        loading="lazy"
                                        priority={false}
                                    />
                                </Link>

                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>
        </>


    );
}
export default SliderSwiper;