"use client"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import UploadFileComponent from "@/app/Components/UploadFileComponent/page"
import TextInput from "@/app/Components/TextInput/page"
import {useState } from "react"


const AddHomework =() =>{
    const [name, setName] = useState("")
    return(
        <div>
            <NavbarPersonalInfo/>
            <h1 className="flex justify-end w-[95%] mt-8">ثبت تکلیف به دوره </h1>
            <div className="mt-8">
            <UploadFileComponent fileName="file" FileId="file" labelTxt="فایل تکلیف" isUrgent={true} heightOfInput="h-[64px]" widthOfInput="w-[95%] mx-auto" hasBorder={true} inputTxt="" uniqueStyle="justify-between px-8"/>
            </div>
            <TextInput containerStyle="flex flex-col gap-1 items-end w-[95%] mx-auto mt-4" placeholder="" style="w-full  border text-center p-4 rounded-[12px]" labelTxt="نام دوره" name="name" onChange={(e) => setName(e.target.value)} value={name} />
            <div className="flex justify-center" >
                <span className=" bg-[#F89535] text-[white] text-center py-3 mt-8 mb-8 w-[81%] rounded-[10px]" onClick={AddHomework}>ثبت مقاله</span>
            </div>


        </div>
    )

}
export default AddHomework