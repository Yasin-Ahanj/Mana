"use client"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import TableHeader from "@/app/Components/TableHeader/Page"
import TableMaker from "@/app/Components/TableMaker/page"

const ActiveClasses = () => {

        const TableData = {
        tableInfo: {
            nameOfColumns: ["عملیات", "کلاس بعدی", "نام", "آیدی"],
            countOfColumns: 4,
            orders: ["process", "next_class", "name", "id"],
            linksName: []
        },
        tableData: [
            {
                process: "waiting",
                next_class: "isi",
                name: "elahe",
                id: 1995,
            },
            {
                process: "waiting",
                next_class: "isi",
                name: "elahe",
                id: 1995,
            },
            {
                process: "waiting",
                next_class: "isi",
                name: "elahe",
                id: 1995,
            },
            {
                process: "waiting",
                next_class: "isi",
                name: "elahe",
                id: 1995,
            },
        ]

    }

    return (
        <div>
            <NavbarPersonalInfo />
            <TableHeader title="کلاس های فعال" discription=""/>
            <TableMaker data={TableData} />
        </div>
    )
}

export default ActiveClasses