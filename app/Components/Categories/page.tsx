"use client";
import { useEffect, useRef, useState } from "react";
import Skeleton from "../Skeleton/Skeleton";
import Link from "next/link";

const Categories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://127.0.0.1:8000/api/v1/all-categories");
            const data = await res.json();
            setCategories(res.status === 200 ? data : []);
        };
        fetchData();
    }, []);

    // 👉 Drag logic
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
        if (!sliderRef.current) return;
        isDown = true;
        sliderRef.current.style.animationPlayState = "paused";
        startX = "touches" in e ? e.touches[0].pageX : e.pageX;
        scrollLeft = sliderRef.current.scrollLeft;
    };

    const stopDrag = () => {
        if (!sliderRef.current) return;
        isDown = false;
        sliderRef.current.style.animationPlayState = "running";
    };

    const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDown || !sliderRef.current) return;
        e.preventDefault();
        const x = "touches" in e ? e.touches[0].pageX : e.pageX;
        const walk = (x - startX) * 1.2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="w-[95%] mx-auto overflow-hidden mt-8">
            <h1 className="text-right mb-4 text-lg font-semibold">کتگوری های آموزشی</h1>
            {categories.length === 0 ? (
                <div className="flex gap-4  justify-end">
                    {[...Array(12)].map((_, i) => (
                        <Skeleton key={i} className="w-[130px] h-[100px] rounded-[20px]" />
                    ))}
                </div>
            ) : (
                <div
                    ref={sliderRef}
                    className="relative overflow-hidden mt-8 cursor-grab active:cursor-grabbing"
                    onMouseDown={startDrag}
                    onMouseLeave={stopDrag}
                    onMouseUp={stopDrag}
                    onMouseMove={onDrag}
                    onTouchStart={startDrag}
                    onTouchEnd={stopDrag}
                    onTouchMove={onDrag}
                >
                    <div className="categories-scroll flex justify-end gap-4 w-max">
                        {[...categories, ...categories].map((category, index) => (
                            <Link
                                key={index}
                                href={`/Pages/${category.route_path}`}
                                className="flex-shrink-0 px-6 py-4 rounded-[20px] bg-[#F89535]/50 whitespace-nowrap"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
