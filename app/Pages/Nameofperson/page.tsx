"use client"
import NavbarLogin from "@/app/Components/NavbarLogin/page"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import TextInput from "@/app/Components/TextInput/page"
import { useEffect, useState } from "react"
const Nameofperson = () =>{
    const [name , setName] = useState("")
    const [mobile, setMobile] = useState("")

    return(
        <div>
            <NavbarLogin />
            <h1 className="flex justify-end w-[95%]"> ثبت نام اشخاص به دوره </h1>
            <TextInput containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4" placeholder="نام و نام خانوادگی " style="w-full  border text-right p-4 rounded-[12px]" labelTxt="نام و نام خانوادگی " name="name" onChange={(e) => setName(e.target.value)} value={name} />
            <TextInput containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4" placeholder="2900449081" style="w-full border text-right p-4 rounded-[12px]" labelTxt="کدملی" name="phone" onChange={(e) => setMobile(e.target.value)} value={mobile} />   
            <TextInput containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4" placeholder="2900449081" style="w-full border text-right p-4 rounded-[12px]" labelTxt="کدملی" name="phone" onChange={(e) => setMobile(e.target.value)} value={mobile} />   
        </div>
    )

}
export default Nameofperson