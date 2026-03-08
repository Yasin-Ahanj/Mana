"use client"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import TableHeader from "@/app/Components/TableHeader/Page"
import TableMaker from "@/app/Components/TableMaker/page"

const TodaysClass = () => {

            const TableData = {
        tableInfo: {
            nameOfColumns: ["عملیات", "جلسه", "نام کلاس", "تاریخ"],
            countOfColumns: 4,
            orders: ["process", "session", "class_name", "date"],
            linksName: []
        },
        tableData: [
            {
                process: "started",
                session: "1",
                class_name: "isi",
                date: 1995,
            },
            {
                process: "started",
                session: "1",
                class_name: "isi",
                date: 1995,
            },
            {
                process: "started",
                session: "1",
                class_name: "isi",
                date: 1995,
            },
            {
                process: "started",
                session: "1",
                class_name: "isi",
                date: 1995,
            },
        ]

    }

    return(
        <div>
            <NavbarPersonalInfo/>
            <TableHeader title="کلاس های امروز من" discription=""/>
            <TableMaker data={TableData} />
        </div>
    )
}

export default TodaysClass