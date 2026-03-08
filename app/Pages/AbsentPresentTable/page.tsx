"use client"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import TableHeader from "@/app/Components/TableHeader/Page"
import TableMaker from "@/app/Components/TableMaker/page"

const AbsentPresentTable = () => {

    const TableData = {
        tableInfo: {
            nameOfColumns: ["غیاب", "حضور", "نام","تاریخ"],
            countOfColumns: 4,
            orders: ["absent", "present","name","class_date"],
            linksName: []

        },
        tableData: [
            {
                absent: "absent",
                present: "present",
                name: "elahe" ,
                class_date: 1995,
            },
            {
                absent: "absent",
                present: "present",
                name: "elahe" ,
                class_date: 1995,
            },
            {
                absent: "absent",
                present: "present",
                name: "elahe" ,
                class_date: 1995,
            },
            {
                absent: "absent",
                present: "present",
                name: "elahe" ,
                class_date: 1995,
            },
        ]

    }

    return(
        <div>
            <NavbarPersonalInfo/>
            <TableHeader title="جدول حضور غیاب" discription=""/>
            <TableMaker data={TableData} />
        </div>
    )
}

export default AbsentPresentTable 