"use client"
import Navbar from "@/app/Components/Navbar/page"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import PersonalId from "@/app/Components/PesonalId/page"
import TableHeader from "@/app/Components/TableHeader/Page"
import TableMaker from "@/app/Components/TableMaker/page"
import { useState } from "react"
const BuffetsPayment = () => {
    const [isPayedChosen, setIsPayedChosen] = useState(false)
    const payedChoosenDisplay = () => {
        setIsPayedChosen(true)
    }
    const notPayedChoosenDisplay = () => {
        setIsPayedChosen(false)
    }


    const TableData = {
        tableInfo: {
            nameOfColumns: ["فاکتور", "کد ملی", "نام", "تاریخ"],
            countOfColumns: 4,
            orders: ["factor", "national_code", "name", "date"],
            linksName: []

        },
        tableData: [
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                factor: "0914636241"
            },
            {
                date: 1985,
                name: "elahe",
                national_code: "245754854",
                factor: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                factor: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                factor: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                factor: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                factor: "0914636241"
            },

        ]
    }


    return (
        <div>
            <NavbarPersonalInfo />
            <PersonalId title="استعلام خرید بوفه" placeholder="کدملی  / نام" />
            <div className="flex justify-end w-[95%] mt-[12px] gap-8">
                <span onClick={payedChoosenDisplay} className={isPayedChosen == true ? 'bg-[#F89535] px-4 py-2 rounded-[12px]' : 'px-4 py-2 hover:cursor-pointer'}>پرداخت شده</span>
                <span onClick={notPayedChoosenDisplay} className={isPayedChosen == false ? 'bg-[#F89535] px-4 py-2 rounded-[12px]' : 'px-4 py-2 hover:cursor-pointer'}>پرداخت نشده</span>
            </div>
            <TableHeader title="خرید های بوفه" description="" />
            <TableMaker data={TableData} />
        </div>
    )
}
export default BuffetsPayment