"use client"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import TableHeader from "@/app/Components/TableHeader/Page"
import TableMaker from "@/app/Components/TableMaker/page"

const EndedClasses = () => {

            const TableData = {
        tableInfo: {
            nameOfColumns: ["تعداد جلسات", "تاریخ پایان", "نام", "تاریخ شروع"],
            countOfColumns: 4,
            orders: ["count", "end_date", "name", "start_date"],
            linksName: []
        },
        tableData: [
            {
                count: "1",
                end_date: "1407",
                name: "elahe",
                start_date: 1406,
            },
            {
                count: "1",
                end_date: "1407",
                name: "elahe",
                start_date: 1406,
            },
            {
                count: "1",
                end_date: "1407",
                name: "elahe",
                start_date: 1406,
            },
            {
                count: "1",
                end_date: "1407",
                name: "elahe",
                start_date: 1406,
            },
        ]

    }


    return(
        <div>
            <NavbarPersonalInfo />
            <TableHeader title="کلاس های پایان یافته" discription=""/>
            <TableMaker data={TableData} />
        </div>
    )
}

export default EndedClasses