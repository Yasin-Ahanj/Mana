"use client";

import CourseBox from "@/app/Components/CourseBox/page";
import Footer from "@/app/Components/Footer/page";
import ImageBox from "@/app/Components/ImageBox/page";
import Navbar from "@/app/Components/Navbar/page";
import Skeleton from "@/app/Components/Skeleton/Skeleton";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
    id: number;
    name: string;
    introduction: string;
    file_slug: string;
    moreDetails: string;
}

interface Course {
    id: number;
    title: string;
}

interface ApiResponse {
    mainData: Category;
    courses: Course[];
}

const CategorieCourses = () => {
    const params = useParams<{ CategorieCourses: string }>();
    const nameOfCategory = params.CategorieCourses;

    const [data, setData] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        const res = await fetch(
            "http://127.0.0.1:8000/api/v1/get-category-by-route-path",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ route_path: nameOfCategory }),
            }
        );

        const result = await res.json();


        setData(result);
        setIsLoading(false);
    };

    useEffect(() => {
        if (nameOfCategory) {
            fetchData();
        }
    }, [nameOfCategory]);

    return (
        <div>
            <Navbar />
            <div dir="rtl" className=" w-[90%] mx-auto mt-4 ">
                {
                    isLoading ? (
                        <div className="flex flex-col gap-4">
                            <Skeleton className="w-[90%] h-[50px] mx-auto py-2 rounded-[2px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]" />
                            <Skeleton className="w-[90%] h-[100px] mx-auto py-2 rounded-[2px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]" />
                            <Skeleton className="w-[90%] h-[100px] mx-auto py-2 rounded-[2px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]" />
                            <Skeleton className="w-[100%] h-[300px] mx-auto py-2 rounded-[2px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]" />
                        </div>
                    ) : (
                        <>
                            <h1 className=" text-[#000] text-[24px] my-1">دوره های {data?.mainData?.name}  </h1>
                            <p className="text-justify my-1">{data?.mainData?.introduction}</p>
                            <p className="text-[#000]/50 text-justify my-1" >{data?.mainData?.moreDetails}</p>
                            {
                                data == null ? (
                                    <div>در حال بارگذاری داده ها...</div>
                                ) : (
                                    <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
                                        <ImageBox
                                            slug={data?.mainData?.file_slug}
                                            alt={data?.mainData?.name}
                                            class="w-[100%] h-[300px]"
                                        />
                                    </div>

                                )
                            }

                        </>

                    )
                }

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {
                    isLoading ? Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-[90%] h-[200px] mx-auto py-2 rounded-[2px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"
                        />
                    )
                    ) : (
                        data?.courses.map((course: any, index: number) => (

                            <CourseBox
                                key={index}
                                slug={course.file_slug}
                                title={course.title}
                                present_price={course.total_price_present}
                                absence_price={course.total_price_absence}
                                duration={course.duration}
                                has_degree={course.has_degree}
                                id={course.id}
                            />

                        )))

                }
            </div>


            <Footer />



        </div>
    );
};

export default CategorieCourses;
