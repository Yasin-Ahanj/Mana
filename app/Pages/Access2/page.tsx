"use client"
import AccessesComponents from "@/app/Components/AccessesComponents/page"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import { useState } from "react"

const Access2 = () => {

    const [clickedItems, setClickedItems] = useState<boolean[]>([false, false])

    const changeBg = (index: number) => {
        const newItems = [...clickedItems]
        newItems[index] = !newItems[index]
        setClickedItems(newItems)
    }

    const saveChanges = () => {
        console.log("save")
    }

    return (
        <div>
            <NavbarPersonalInfo />
            <h1 className="flex justify-end w-[95%] mt-8 ">مدیریت دسترسی ها</h1>
            <div className="grid grid-cols-2 justify-center  w-[90%] mx-auto mt-8 gap-4">
                <AccessesComponents
                    styleContainer="flex  items-center gap-4 justify-end "
                    txt="خرید از بوفه"
                    changeBg={() => changeBg(0)}
                    StyleBtn={`${clickedItems[0] ? "bg-[#40E637]" : "bg-[#B4B4B4]"} h-[32px] w-[32px] rounded-full`}
                />
                <AccessesComponents
                    styleContainer="flex  items-center gap-4 justify-end"
                    txt="خرید از بوفه"
                    changeBg={() => changeBg(1)}
                    StyleBtn={`${clickedItems[1] ? "bg-[#40E637]" : "bg-[#B4B4B4]"} h-[32px] w-[32px] rounded-full`}
                />
                <AccessesComponents
                    styleContainer="flex  items-center gap-4 justify-end"
                    txt="خرید از بوفه"
                    changeBg={() => changeBg(2)}
                    StyleBtn={`${clickedItems[2] ? "bg-[#40E637]" : "bg-[#B4B4B4]"} h-[32px] w-[32px] rounded-full`}
                />
                <AccessesComponents
                    styleContainer="flex  items-center gap-4 justify-end"
                    txt="خرید از بوفه"
                    changeBg={() => changeBg(3)}
                    StyleBtn={`${clickedItems[3] ? "bg-[#40E637]" : "bg-[#B4B4B4]"} h-[32px] w-[32px] rounded-full`}
                />
                <AccessesComponents
                    styleContainer="flex  items-center gap-4 justify-end"
                    txt="خرید از بوفه"
                    changeBg={() => changeBg(4)}
                    StyleBtn={`${clickedItems[4] ? "bg-[#40E637]" : "bg-[#B4B4B4]"} h-[32px] w-[32px] rounded-full`}
                />
                <AccessesComponents
                    styleContainer="flex  items-center gap-4 justify-end"
                    txt="خرید از بوفه"
                    changeBg={() => changeBg(5)}
                    StyleBtn={`${clickedItems[5] ? "bg-[#40E637]" : "bg-[#B4B4B4]"} h-[32px] w-[32px] rounded-full`}
                />
                <AccessesComponents
                    styleContainer="flex  items-center gap-4 justify-end"
                    txt="خرید از بوفه"
                    changeBg={() => changeBg(6)}
                    StyleBtn={`${clickedItems[6] ? "bg-[#40E637]" : "bg-[#B4B4B4]"} h-[32px] w-[32px] rounded-full`}
                />
                <AccessesComponents
                    styleContainer="flex  items-center gap-4 justify-end"
                    txt="خرید از بوفه"
                    changeBg={() => changeBg(7)}
                    StyleBtn={`${clickedItems[7] ? "bg-[#40E637]" : "bg-[#B4B4B4]"} h-[32px] w-[32px] rounded-full`}
                />
            </div>

            <div className="flex justify-center" >
                <span className=" bg-[#F89535] text-[white] text-center py-3 mt-8 mb-8 w-[81%] rounded-[10px]" onClick={saveChanges}>ثبت تغییرات</span>
            </div>



        </div>
    )
}

export default Access2