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


const CourseBoxInList = ({ data }: CourseData) => {
    const [isNone , setIsNone] = useState(false)

    const getToken = async () => {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedToken, "mana");
        return bytes.toString(CryptoJS.enc.Utf8);
    };
    const deleteCourse = async () => {

        const token = await getToken()
        const res = await fetch(`http://127.0.0.1:8000/api/v1/delete-course/${data.id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });


        if (res.status == 200) {
            toast.success("دوره مورد نظرحذف شد")
            setIsNone(true)
        } else {
            toast.error("حذف دوره به درستی انجام نشد")
        }

    }

    return (
        <Link href={`/Pages/CourseEdits/${data.id}`} className={`${isNone == false ? 'flex' : 'hidden'} justify-around items-center w-[90%] mx-auto  p-4 h-[150px] border rounded-lg`}>
            <Trash
                color="#ff0000"
                size={32}
                onClick={(e) => {
                    e.preventDefault();      // ⛔ prevents Link navigation
                    e.stopPropagation();     // ⛔ stops bubbling to Link
                    deleteCourse();
                }}
            />
            <span>{data.name}</span>
            <img src={data.slug} alt={data.name} className="w-[100px] h-[100px]" />
        </Link>

    )
}
export default CourseBoxInList