"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

import NavbarLogin from "@/app/Components/NavbarLogin/page";
import TableHeader from "@/app/Components/TableHeader/Page";
import TextInput from "@/app/Components/TextInput/page";
import TextAreaComponent from "@/app/Components/TextAreaComponent/page";
import NumberInput from "@/app/Components/NumberInput/page";
import RadioInputComponent from "@/app/Components/RadioBtnComponent/page";
import UploadFileComponent from "@/app/Components/UploadFileComponent/page";
import SelectBox from "@/app/Components/SelectBox/page";

import { ToastContainer, toast } from "react-toastify";

interface Category {
    id: number;
    name: string;
}

const CourseEdits = () => {
    const params = useParams<{ id: string }>();
    const courseID = params.id;
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

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");

    // ✅ token
    const getToken = () => {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedToken, "mana");
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    // ✅ fetch course data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getToken();

                // fetch course
                const res = await fetch(`http://127.0.0.1:8000/api/v1/get-one-course/${courseID}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json();

                setName(data.title);
                setIntroduction(data.introduction);
                setDetail(data.detail);
                setTimeNeeded(data.needed_time);
                setPricePresent(data.total_price_present);
                setPriceAbsence(data.total_price_absence);
                console.log(data)
                data.has_degree == 0 ? setHasLicense(false) : setHasLicense(true)
                setSelectedCategoryId(data.category_id);

                // fetch categories
                const catRes = await fetch("http://127.0.0.1:8000/api/v1/all-categories");
                const catData = await catRes.json();
                setCategories(catData);

            } catch (err) {
                console.error(err);
                toast.error("خطا در دریافت اطلاعات");
            }
        };

        if (courseID) fetchData();
    }, [courseID]);

    // ✅ upload file
    const handleFileUpload = async (file: File) => {
        try {
            setUploading(true);

            const token = getToken();
            if (!token) throw new Error();

            const formData = new FormData();
            formData.append("file", file);
            formData.append("is_private", "0");

            const res = await fetch("http://127.0.0.1:8000/api/v1/file-store", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                setThumbnailFileId(data.file.id);
                toast.success("آپلود شد");
            }
        } catch {
            toast.error("خطا در آپلود");
        } finally {
            setUploading(false);
        }
    };

    // ✅ update course
    // ✅ update course using PUT
    const updateCourse = async () => {
        try {
            const token = getToken();
            if (!token) throw new Error("No token found");

            const res = await fetch(`http://127.0.0.1:8000/api/v1/update-course/${courseID}`, {
                method: "PUT", // ✅ use PUT
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

            if (res.ok) {
                toast.success("دوره بروزرسانی شد");
                navigate.push('/Pages/CoursesList')
            } else {
                const errData = await res.json();
                toast.error(errData.message || "خطا در بروزرسانی");
            }
        } catch (error) {
            console.error(error);
            toast.error("مشکلی پیش آمده");
        }
    };

    const licenseOptions = [
        { value: true, label: "مدرک دارد" },
        { value: false, label: "مدرک ندارد" },
    ];

    return (
        <div>
            <NavbarLogin />

            <ToastContainer position="top-center" rtl autoClose={3000} />

            <TableHeader title="ویرایش دوره" discription="" />

            <TextInput
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                placeholder="عنوان"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="عنوان دوره"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
            />

            <div className="flex justify-end w-[90%] mx-auto mt-4">
                <UploadFileComponent
                    fileName="file"
                    FileId="file"
                    labelTxt="تصویر"
                    heightOfInput="h-[64px]"
                    widthOfInput="w-[45%]"
                    hasBorder
                    inputTxt={uploading ? "در حال آپلود..." : "آپلود"}
                    uniqueStyle="justify-between px-8"
                    onFileSelect={handleFileUpload}
                />
            </div>

            <RadioInputComponent
                options={licenseOptions}
                value={hasLicense}
                onChange={(v) => setHasLicense(v as boolean)}
                label="مدرک"
                name="has_degree"
                containerStyle="flex flex-col w-[90%] mx-auto items-end mt-4"
            />

            <div className="flex justify-end w-[90%] mx-auto mt-4">
                <SelectBox
                    options={categories.map(c => ({ value: c.id, label: c.name }))}
                    value={selectedCategoryId.toString()}
                    onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                    style="w-full border text-right p-4 rounded-[12px]"
                    label="دسته‌بندی"
                    name="category"
                    containerStyle="w-[50%] flex flex-col items-end gap-1"
                    isNessesary
                />
            </div>

            <TextAreaComponent
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="مقدمه"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                name="intro"
                placeholder=""
            />

            <TextAreaComponent
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="توضیحات"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                name="detail"
                placeholder=""
            />

            <NumberInput
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="زمان"
                value={timeNeeded}
                onChange={(e) => setTimeNeeded(e.target.value)}
                name="time"
                placeholder=""
            />

            <NumberInput
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="قیمت حضوری"
                value={pricePresent}
                onChange={(e) => setPricePresent(e.target.value)}
                name="present"
                placeholder=""
            />

            <NumberInput
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="قیمت غیرحضوری"
                value={priceAbsence}
                onChange={(e) => setPriceAbsence(e.target.value)}
                name="absence"
                placeholder=""
            />

            <div className="flex justify-center">
                <span
                    className="bg-[#F89535] text-white py-3 mt-8 mb-8 w-[81%] text-center rounded-[10px] cursor-pointer"
                    onClick={updateCourse}
                >
                    بروزرسانی دوره
                </span>
            </div>
        </div>
    );
};

export default CourseEdits;