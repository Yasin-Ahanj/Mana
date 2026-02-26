"use client"
import Comment from "./comment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { StaticImageData } from "next/image";
import user1 from "@/public/Images/comments/user1.png";
import user2 from "@/public/Images/comments/user2.png";
import user3 from "@/public/Images/comments/user3.png";



const Comments = () => {
    return (
        <div className="w-[95%] mx-auto overflow-hidden mt-8">
            <h1 className="text-right mb-4  mt-8 text-lg font-semibold">بقیه راجب ما چی میگن</h1>

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

                <SwiperSlide key={1}>
                    <Comment name="امیر عزیززاده" image={user1} comment="ل، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد نشصتیهت شتصیخ خحشتصیخ ختشصیخ تشخصتی شصصیخشتصی ی شخصی تشخصیت خشتص ییخش تصی ." />
                </SwiperSlide>
                <SwiperSlide key={2}>
                    <Comment name="امیر عزیززاده" image={user2} comment="ل، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد نشصتیهت شتصیخ خحشتصیخ ختشصیخ تشخصتی شصصیخشتصی ی شخصی تشخصیت خشتص ییخش تصی ." />
                </SwiperSlide>
                <SwiperSlide key={3}>
                    <Comment name="امیر عزیززاده" image={user3} comment="ل، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد نشصتیهت شتصیخ خحشتصیخ ختشصیخ تشخصتی شصصیخشتصی ی شخصی تشخصیت خشتص ییخش تصی ." />
                </SwiperSlide>
            </Swiper>

        </div>
    );
};

export default Comments;