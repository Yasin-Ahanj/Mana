import { Trash } from "iconsax-reactjs";
import Link from "next/link";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { useState } from "react";

type CourseData = {
    name: string;
    id: number;
    slug: string;
}


const ArticleBoxInList = ({ data }: CourseData) => {
    console.log(data)
    const [isNone , setIsNone] = useState(false)

    const getToken = async () => {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedToken, "mana");
        return bytes.toString(CryptoJS.enc.Utf8);
    };
    const deleteCourse = async () => {

        const token = await getToken()
        const res = await fetch(`http://127.0.0.1:8000/api/v1/delete-article/${data.id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });


        if (res.status == 200) {
            toast.success("مقاله مورد نظرحذف شد")
            setIsNone(true)
        } else {
            toast.error("حذف مقاله به درستی انجام نشد")
        }

    }

    return (
        <Link href={`/Pages/ArticleEdit/${data.id}`} className={`${isNone == false ? 'flex' : 'hidden'} justify-around items-center w-[90%] mx-auto  p-4 h-[150px] border rounded-lg`}>
            <Trash
                color="#ff0000"
                size={32}
                onClick={(e) => {
                    e.preventDefault();      // ⛔ prevents Link navigation
                    e.stopPropagation();     // ⛔ stops bubbling to Link
                    deleteCourse();
                }}
            />
            <span>{data.title}</span>
            <img src={data.first_photo_pic_file_slug} alt={data.name} className="w-[100px] h-[100px]" />
        </Link>

    )
}
export default ArticleBoxInList