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
import Link from "next/link";
type Props = {
    typeName: string;
    url: string;
};

interface Article {
    id: number;
    introduction: string; // make sure this is the image URL
    title: string;
    other_contents: JSON;
    first_photo_pic_file_slug: string;
}

const HomePageArticles = ({ typeName, url }: Props) => {
    const [articleData, setArticleData] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    const truncateText = ({ paragraph, maxLength = 100 }: { paragraph: string, maxLength: number }) => {
        if (!paragraph) return "";

        return paragraph.length > maxLength
            ? paragraph.slice(0, maxLength) + "..."
            : paragraph;
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${url}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();
                if (res.status === 200) {
                    setArticleData(data.articles)
                    setIsLoading(false);
                } else setArticleData([]);
            } catch (error) {
                console.error(error);
                setArticleData([]);
            }
        };
        fetchData();
    }, []);

    // chunk Articles into arrays of 3
    const chunkArticles = (Articles: Article[], size: number) => {
        const chunks: Article[][] = [];
        for (let i = 0; i < Articles.length; i += size) {
            chunks.push(Articles.slice(i, i + size));
        }
        return chunks;
    };

    const ArticleChunks = chunkArticles(articleData, 2);

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
                    loop={ArticleChunks.length > 1} // only loop if more than 1 slide
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

                    {ArticleChunks.map((chunk, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-[#FBE0C9]/60 rounded-[20px] p-4 flex flex-col gap-4">
                                {chunk.map((item) => (
                                    <div key={item.id}>
                                        <div
                                            key={item.id}
                                            className="flex flex-col justify-center bg-white p-1 pb-4 rounded-[8px]"
                                        >
                                            <div className="flex w-[100%] p-l-1  mx-auto justify-between items-start gap-2  rounded-lg">
                                                <div className="relative  w-24 h-24 rounded-full  overflow-hidden">
                                                    <Image
                                                        src={item.first_photo_pic_file_slug}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                        loading="lazy"
                                                        unoptimized
                                                    />
                                                </div>
                                                <div className="flex flex-col w-[70%] gap-1">
                                                    <h2 className="text-sm font-bold lg:text-[24px] mt-4">{item.title}</h2>
                                                    <p className="text-[#000]/50  lg:text-[24px]">
                                                        {truncateText({ paragraph: item.introduction, maxLength: 200 })}
                                                    </p>
                                                </div>
                                            </div>

                                            <Link href={`/Articles/${item.id}`}  className="flex justify-center rounded-[12px] items-center text-[#000] text-[1em] font-bold h-[49px] block w-[90%] mt-8 mx-auto border-1 border-[#F89535] lg:h-[70px]">
                                                مطالعه بیشتر ...
                                            </Link>
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

export default HomePageArticles;
