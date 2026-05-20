"use client"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import SelectBox from "@/app/Components/SelectBox/page"
import TableHeader from "@/app/Components/TableHeader/Page"
import { useState } from "react"

const Access = () => {
    const [role, setRole] = useState("user")
    const saveEdit = () => {
        console.log("save")
    }
    return (
        <div>
            <NavbarPersonalInfo />
            <TableHeader title="مدیریت دسترسی ها" discription=""/>
            <SelectBox
                options={[
                    { value: "manager", label: "مدیر" },
                    { value: "support", label: "پشتیبان" },
                    { value: "learner", label: "کارآموز" },
                    { value: "user", label: "کاربر" },
                ]}
                onChange={(e) => setRole(e.target.value)}
                value={role}
                style="w-[100%] border mx-auto py-5 px-4 appearance-none text-center rounded-[12px]"
                label="نام نقش"
                name="gender"
                containerStyle="flex w-[90%] mt-4 mx-auto  flex-col  items-end gap-1  relative "
                isNessesary={true}
                optionsStyle="rounded-[12px]"
            />

            <div className="flex justify-center" >
                <span className=" bg-[#F89535] text-[white] text-center py-3 mt-8 mb-8 w-[90%] rounded-[10px]" onClick={saveEdit}>ویرایش</span>
            </div>



        </div>

    )

}
export default Access