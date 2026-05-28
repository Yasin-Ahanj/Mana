"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";

import NavbarLogin from "@/app/Components/NavbarLogin/page";
import TableHeader from "@/app/Components/TableHeader/Page";
import TextInput from "@/app/Components/TextInput/page";
import TextAreaComponent from "@/app/Components/TextAreaComponent/page";
import UploadFileComponent from "@/app/Components/UploadFileComponent/page";

import { AddCircle, MinusCirlce } from "iconsax-reactjs";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddArticle = () => {
    const [name, setName] = useState("");
    const [introduction, setIntroduction] = useState("");

    const [firstPhotoId, setFirstPhotoId] = useState<number | null>(null);
    const [secondPhotoId, setSecondPhotoId] = useState<number | null>(null);

    const [uploading, setUploading] = useState(false);

    // dynamic sections
    const [sections, setSections] = useState<
        { title: string; content: string }[]
    >([]);

    // get token helper
    const getToken = () => {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedToken, "mana");
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    // add/remove section
    const addSentence = () => {
        setSections([...sections, { title: "", content: "" }]);
    };

    const removeSentence = () => {
        setSections(sections.slice(0, -1));
    };

    // file upload with notifier
    const handleFileUpload = async (file: File, type: "first" | "second") => {
        const toastId = toast.loading("در حال آپلود فایل...");

        try {
            setUploading(true);

            const token = getToken();
            if (!token) throw new Error("No token");

            const formData = new FormData();
            formData.append("file", file);
            formData.append("is_private", "0");

            const res = await fetch("http://127.0.0.1:8000/api/v1/file-store", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                if (type === "first") setFirstPhotoId(data.file.id);
                else setSecondPhotoId(data.file.id);

                toast.update(toastId, {
                    render: "آپلود با موفقیت انجام شد ✅",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
            } else {
                throw new Error("Upload failed");
            }
        } catch (err) {
            toast.update(toastId, {
                render: "خطا در آپلود فایل ❌",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });

            console.error("Upload error:", err);
        } finally {
            setUploading(false);
        }
    };

    // submit article
    const addArticle = async () => {
        try {
            const token = getToken();
            if (!token) throw new Error("No token");

            if (!firstPhotoId || !secondPhotoId) {
                alert("لطفا تصاویر را آپلود کنید");
                return;
            }

            const res = await fetch(
                "http://127.0.0.1:8000/api/v1/store-article",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: name,
                        introduction,
                        first_photo_pic_file_id: firstPhotoId,
                        secound_photo_pic_file_id: secondPhotoId,
                        other_contents: sections,
                    }),
                }
            );

            const data = await res.json();
            console.log("SUCCESS:", data);
            if (res.status == 200) {

                toast.success("مقاله با موفقیت افزوده شد ✅");
            } else {
                toast.error("مشکلی در افزودن مقاله وجود دارد");

            }
        } catch (error) {
            console.error("Submit error:", error);
            toast.error("خطا در افزودن مقاله ❌");
        }
    };

    return (
        <div>
            <NavbarLogin />
            <ToastContainer position="top-center" autoClose={3000} rtl={true} />
            <TableHeader title="افزودن مقالات" discription="" />

            {/* Title */}
            <TextInput
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                placeholder="عنوان مقاله"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="عنوان مقاله"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            {/* Uploads */}
            <div className="flex justify-between w-[90%] mx-auto mt-4">
                <UploadFileComponent
                    fileName="file"
                    FileId="file"
                    labelTxt="تصویر میانی"
                    isUrgent={false}
                    heightOfInput="h-[64px]"
                    widthOfInput="w-[45%]"
                    hasBorder={true}
                    inputTxt={uploading ? "در حال آپلود..." : "آپلود عکس"}
                    uniqueStyle="justify-between px-8"
                    onFileSelect={(file) => {
                        if (!uploading) handleFileUpload(file, "second");
                    }}
                />

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
                    onFileSelect={(file) => {
                        if (!uploading) handleFileUpload(file, "first");
                    }}
                />
            </div>

            {/* Introduction */}
            <TextAreaComponent
                containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4"
                placeholder="متن مقاله"
                style="w-full border text-right p-4 rounded-[12px]"
                labelTxt="متن مقاله"
                name="introduction"
                onChange={(e) => setIntroduction(e.target.value)}
                value={introduction}
            />

            {/* Add/Remove section */}
            <div className="w-[90%] mx-auto flex mt-8 gap-8">
                <AddCircle size={32} color="#F89535" onClick={addSentence} />
                <MinusCirlce size={32} color="#F89535" onClick={removeSentence} />
            </div>

            {/* Sections */}
            {sections.map((section, index) => (
                <div key={index} className="w-[90%] mx-auto mt-4 flex flex-col">
                    <TextInput
                        containerStyle="flex flex-col gap-1 items-end w-full mt-4"
                        placeholder="سر تیتر"
                        style="w-full border text-right p-4 rounded-[12px]"
                        labelTxt="سر تیتر"
                        name="title"
                        value={section.title}
                        onChange={(e) => {
                            const updated = [...sections];
                            updated[index].title = e.target.value;
                            setSections(updated);
                        }}
                    />

                    <TextAreaComponent
                        containerStyle="flex flex-col gap-1 items-end w-full mt-4"
                        placeholder="پاراگراف"
                        style="w-full border text-right p-4 rounded-[12px]"
                        labelTxt="پاراگراف"
                        name="content"
                        value={section.content}
                        onChange={(e) => {
                            const updated = [...sections];
                            updated[index].content = e.target.value;
                            setSections(updated);
                        }}
                    />
                </div>
            ))}

            {/* Submit */}
            <div className="flex justify-center">
                <span
                    className="bg-[#F89535] text-white text-center py-3 mt-8 mb-8 w-[81%] rounded-[10px] cursor-pointer"
                    onClick={addArticle}
                >
                    ثبت مقاله
                </span>
            </div>
        </div>
    );
};

export default AddArticle;