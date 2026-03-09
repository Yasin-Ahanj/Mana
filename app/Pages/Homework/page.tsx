"use client"
import DownloadFile from "@/app/Components/DownloadFile/page"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import TableHeader from "@/app/Components/TableHeader/Page"
import TextInput from "@/app/Components/TextInput/page"
import { useState } from "react"



const Homework = () => {

    const [grade, setGrade] = useState("")

    const [studentName , setStudentName] = useState("دانشجو")

    const submitGrade = () => {
        console.log("click shod")
    }

    return (
        <div>
            <NavbarPersonalInfo />
            <TableHeader title={`تکلیف ${studentName} `} discription="" />
            <div className="flex w-[90%] mx-auto justify-end gap-8">

                <DownloadFile fileName="دانلود فایل تکلیف" fileLink="https://www.google.com" />
                <DownloadFile fileName="دانلود فایل پاسخ" fileLink="https://www.google.com" />
            </div>
            <TextInput containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4" placeholder="" style="w-full border text-center p-4 rounded-[12px]" labelTxt="نمره تمرین" name="grade" onChange={(e) => setGrade(e.target.value)} value={grade} />

            <div className="flex justify-center w-[90%] mx-auto" >
                <span className=" bg-[#F89535] text-[white] mt-8 w-[100%] h-[57px] flex justify-center items-center text-[24px] rounded-[10px]" onClick={submitGrade}>ثبت نمره</span>
            </div>
        </div>
    )
}

export default Homework