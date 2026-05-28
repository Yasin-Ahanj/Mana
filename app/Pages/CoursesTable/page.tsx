"use client"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import TableHeader from "@/app/Components/TableHeader/Page"
import TableMaker from "@/app/Components/TableMaker/page"
import { useState } from "react"

const CoursesTable = () => {

    const [isWaiting, setIsWaiting] = useState(false)
    const waitChoosenDisplay = () => {
        setIsWaiting(true)
    }
    const notWaitChoosenDisplay = () => {
        setIsWaiting(false)
    }

        const TableData = {
        tableInfo: {
            nameOfColumns: ["عملیات", "شماره موبایل", "نام", "تاریخ"],
            countOfColumns: 4,
            orders: ["process", "mobile", "name", "date"],
            linksName: []
        },
        tableData: [
            {
                process: "started",
                mobile: "09145556655",
                name: "elahe",
                date: 1995,
            },
            {
                process: "waiting",
                mobile: "09145556655",
                name: "elahe",
                date: 1995,
            },
            {
                process: "started",
                mobile: "09145556655",
                name: "elahe",
                date: 1995,
            },
            {
                process: "waiting",
                mobile: "09145556655",
                name: "elahe",
                date: 1995,
            },
            {
                process: "started",
                mobile: "09145556655",
                name: "elahe",
                date: 1995,
            },
        ]

    }

    return (
        <div>
            <NavbarPersonalInfo />
            <TableHeader title="مشاهده دوره ها" discription="" />
            <div className="flex justify-end w-[95%] mt-[12px] gap-8">
                <span onClick={waitChoosenDisplay} className={isWaiting == true ? 'bg-[#F89535] px-4 py-2 rounded-[12px]' : 'px-4 py-2 hover:cursor-pointer'}>در انتظار شروع</span>
                <span onClick={notWaitChoosenDisplay} className={isWaiting == false ? 'bg-[#F89535] px-4 py-2 rounded-[12px]' : 'px-4 py-2 hover:cursor-pointer'}>شروع شده</span>
            </div>
            <TableMaker data={TableData} />
        </div>
    )
}

export default CoursesTable