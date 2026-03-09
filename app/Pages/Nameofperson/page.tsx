"use client"
import NavbarLogin from "@/app/Components/NavbarLogin/page"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import SelectBox from "@/app/Components/SelectBox/page"
import TextInput from "@/app/Components/TextInput/page"
import UploadFileComponent from "@/app/Components/UploadFileComponent/page"
import { useEffect, useState } from "react"
const Nameofperson = () => {
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [gender, setGender] = useState("1")

    return (
        <div>
            <NavbarLogin />
            <h1 className="flex justify-end w-[95%] mt-4"> ثبت نام اشخاص به دوره </h1>
            <TextInput containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4" placeholder="نام و نام خانوادگی " style="w-full  border text-right p-4 rounded-[12px]" labelTxt="نام و نام خانوادگی " name="name" onChange={(e) => setName(e.target.value)} value={name} />
            <TextInput containerStyle="flex flex-col gap-1 items-end w-[90%] mx-auto mt-4" placeholder="2900449081" style="w-full border text-right p-4 rounded-[12px]" labelTxt="کدملی" name="phone" onChange={(e) => setMobile(e.target.value)} value={mobile} />
            <div className="flex justify-between w-[90%] mx-auto items-center mt-4">
                <UploadFileComponent fileName="file" FileId="file" labelTxt="اسکن عکس 3*4" isUrgent={false} heightOfInput="h-[64px]" widthOfInput="w-[45%]" hasBorder={true} inputTxt="آپلود عکس"/>
                <SelectBox
                    options={[
                        { value: "1", label: "مرد" },
                        { value: "2", label: "زن" }
                    ]}
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    style="w-[100%] border py-5 px-4 appearance-none text-center rounded-[12px]"
                    label="جنسیت"
                    name="gender"
                    containerStyle="flex w-[45%]  flex-col  items-end gap-1  relative "
                    isNessesary={true}
                    optionsStyle="rounded-[12px]"
                />
            </div>

        </div>
    )

}
export default Nameofperson