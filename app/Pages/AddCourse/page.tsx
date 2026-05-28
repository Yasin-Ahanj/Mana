"use client";

import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

import NavbarLogin from "@/app/Components/NavbarLogin/page";
import TableHeader from "@/app/Components/TableHeader/Page";
import TextInput from "@/app/Components/TextInput/page";
import TextAreaComponent from "@/app/Components/TextAreaComponent/page";
import NumberInput from "@/app/Components/NumberInput/page";
import RadioInputComponent from "@/app/Components/RadioBtnComponent/page";
import UploadFileComponent from "@/app/Components/UploadFileComponent/page";
import SelectBox from "@/app/Components/SelectBox/page";

import { AddCircle, MinusCirlce } from "iconsax-reactjs";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Category {
    id: number;
    name: string;
    route_path: string;
}

const AddCourse = () => {
    const navigate = useRouter()

    const [name, setName] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [detail, setDetail] = useState("");
    const [timeNeeded, setTimeNeeded] = useState("");
    const [priceAbsence, setPriceAbsence] = useState("");
    const [pricePresent, setPricePresent] = useState("");
    const [hasLicense, setHasLicense] = useState(false);

    const [thumbnailFileId, setThumbnailFileId] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);


    // ✅ Categories
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");


    // ✅ decrypt token helper
    const getToken = () => {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedToken, "mana");
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    // ✅ Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/v1/all-categories");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // ✅ upload immediately after file select
    const handleFileUpload = async (file: File) => {
        try {
            setUploading(true);

            const token = getToken();
            if (!token) throw new Error("No token found");

            const formData = new FormData();
            formData.append("file", file);
            formData.append("is_private", 0);

            const res = await fetch("http://127.0.0.1:8000/api/v1/file-store", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                setThumbnailFileId(data.file.id);
                toast.success("فایل شما آپلود شد")
            }
        } catch (error) {
            toast.error("خطا انتقال فایل")

            console.error("Upload error:", error);
        } finally {
            setUploading(false);
        }
    };

    // ✅ submit course
    const addCourse = async () => {
        try {
            if (!thumbnailFileId) return alert("لطفا اول تصویر را آپلود کنید");
            if (!selectedCategoryId) return alert("لطفا یک دسته‌بندی انتخاب کنید");

            const token = getToken();
            if (!token) throw new Error("No token found");

            const res = await fetch("http://127.0.0.1:8000/api/v1/store-course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: name,
                    introduction,
                    detail,
                    needed_time: timeNeeded,
                    total_price_present: pricePresent,
                    total_price_absence: priceAbsence,
                    has_degree: hasLicense,
                    thumbnail_file_id: thumbnailFileId,
                    category_id: selectedCategoryId,
                }),
            });

            toast.success("دوره با موفقیت افزوده شد")
            navigate.push('/Pages/CoursesList')

        } catch (error) {
            toast.error("مشکلی در افزودن دوره وجود دارد")

            console.error("Submit error:", error);
        }
    };

    const licenseOptions = [
        { value: true, label: "مدرک دارد" },
        { value: false, label: "مدرک ندارد" },
    ];





    return (
        <div>
            <NavbarLogin />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName="my-toast"
            />
            <TableHeader title="افزودن دوره" discription="" />

            <TextInput
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                placeholder="دوره برنامه نویسی"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="عنوان دوره"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            {/* ✅ Upload */}
            <div className="flex justify-end w-[90%] mx-auto mt-4">
                <UploadFileComponent
                    fileName="file"
                    FileId="file"
                    labelTxt="تصویر اصلی"
                    isUrgent={true}
                    heightOfInput="h-[64px]"
                    widthOfInput="w-[45%]"
                    hasBorder={true}
                    inputTxt={uploading ? "در حال آپلود..." : "آپلود عکس"}
                    uniqueStyle="justify-between px-8"
                    onFileSelect={handleFileUpload}
                />
            </div>

            {/* ✅ License */}
            <RadioInputComponent
                options={licenseOptions}
                value={hasLicense}
                onChange={(value) => setHasLicense(value as boolean)}
                label="آیا دارای مدرک فنی حرفه ای است؟"
                name="has_degree"
                containerStyle="flex flex-col w-[90%] mx-auto items-end mt-4"
            />

            {/* ✅ Category select */}
            <div className="flex justify-end w-[90%] mx-auto mt-4">
                <SelectBox
                    options={categories.map(c => ({ value: c.id, label: c.name }))}
                    onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                    value={selectedCategoryId.toString()}
                    style="w-full border text-right p-4 rounded-[12px] relative"
                    label="دسته‌بندی"
                    name="category"
                    containerStyle="w-[50%] flex flex-col items-end gap-1"
                    isNessesary={true}
                />
            </div>

            <TextAreaComponent
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                placeholder="توضیحات دوره"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="متن مقاله"
                name="introduction"
                onChange={(e) => setIntroduction(e.target.value)}
                value={introduction}
            />

            <TextAreaComponent
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                placeholder="توضیحات اضافه"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="توضیحات اضافه"
                name="detail"
                onChange={(e) => setDetail(e.target.value)}
                value={detail}
            />

            <NumberInput
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                placeholder="زمان (دقیقه)"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="زمان مورد نیاز"
                name="time"
                onChange={(e) => setTimeNeeded(e.target.value)}
                value={timeNeeded}
            />

            <NumberInput
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                placeholder="هزینه حضوری"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="هزینه حضوری"
                name="present"
                onChange={(e) => setPricePresent(e.target.value)}
                value={pricePresent}
            />

            <NumberInput
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                placeholder="هزینه غیر حضوری"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="هزینه غیر حضوری"
                name="absence"
                onChange={(e) => setPriceAbsence(e.target.value)}
                value={priceAbsence}
            />



            <div className="flex justify-center">
                <span
                    className="bg-[#F89535] text-white text-center py-3 mt-8 mb-8 w-[81%] rounded-[10px] cursor-pointer"
                    onClick={addCourse}
                >
                    ثبت دوره
                </span>
            </div>
        </div>
    );
};

export default AddCourse;