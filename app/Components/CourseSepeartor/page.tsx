"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Timer1 } from "iconsax-reactjs";
import Skeleton from "../Skeleton/Skeleton";
import { url } from "inspector";
type Props = {
    typeName: string;
    url: string;
};

interface Course {
    id: number;
    slug: string; // make sure this is the image URL
    title: string;
    has_degree: boolean;
    needed_time: number;
}

const CourseSepeartor = ({ typeName , url }: Props) => {
    const [coursesData, setCoursesData] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const convertSecondsToTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${url}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();
                if (res.status === 200) {
                    setCoursesData(data.courses)
                    setIsLoading(false);
                } else setCoursesData([]);
            } catch (error) {
                console.error(error);
                setCoursesData([]);
            }
        };
        fetchData();
    }, []);

    // chunk courses into arrays of 3
    const chunkCourses = (courses: Course[], size: number) => {
        const chunks: Course[][] = [];
        for (let i = 0; i < courses.length; i += size) {
            chunks.push(courses.slice(i, i + size));
        }
        return chunks;
    };

    const courseChunks = chunkCourses(coursesData, 3);

    return (
        <div className="mt-8 w-[95%] mx-auto ">
            <h1 className="text-right mb-4 text-lg font-semibold">{typeName}</h1>
            {isLoading ? (
                <div className="flex justify-end gap-8 items-center">
                    <Skeleton className="w-[45%] h-[311px]" />
                    <Skeleton className="w-[45%] h-[311px]" />
                </div>
            ) : (
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    spaceBetween={16}
                    slidesPerView={1.2}
                    loop={courseChunks.length > 1} // only loop if more than 1 slide
                    dir="rtl"
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    observer={true}
                    observeParents={true}
                    onSwiper={(swiper) => {
                        swiper.update(); // recalc slides after data load
                        swiper.slideToLoop(0);
                    }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                    }}
                >

                    {courseChunks.map((chunk, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-[#FBE0C9]/60 rounded-[20px] p-4 flex flex-col gap-4">
                                {chunk.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 bg-white rounded-lg p-2"
                                    >
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                            <Image
                                                src={item.slug}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                                loading="lazy"
                                                unoptimized
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <h2 className="text-sm font-bold">{item.title}</h2>
                                            <div>
                                                <div className="flex justify-center gap-2 items-center">
                                                    <Timer1 size={24} color="#48484D" className=" h-[12px] w-[12px]" />
                                                    <div className="flex gap-1">
                                                        <span className="text-[#48484D]">{convertSecondsToTime(item.needed_time)}</span>
                                                        <span className="text-[#48484D]">ساعت</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )

            }

        </div>
    );
};

export default CourseSepeartor;
