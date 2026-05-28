"use client"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import TableHeader from "@/app/Components/TableHeader/Page"
import TableMaker from "@/app/Components/TableMaker/page"


const StudentEndedClasses = () => {

                const TableData = {
        tableInfo: {
            nameOfColumns: ["عملیات", "فایل تکلیف", "نام دوره", "نام دانشجو"],
            countOfColumns: 4,
            orders: ["process", "do_file", "course_name", "student_name"],
            linksName: ["do_file"]
        },
        tableData: [
            {
                process: "1",
                do_file: "file",
                course_name: "isi",
                student_name: "elahe",
            },
            {
                process: "1",
                do_file: "file",
                course_name: "isi",
                student_name: "elahe",
            },
            {
                process: "1",
                do_file: "file",
                course_name: "isi",
                student_name: "elahe",
            },
            {
                process: "1",
                do_file: "file",
                course_name: "isi",
                student_name: "elahe",
            },
        ]

    }

    return (
        <div>
            <NavbarPersonalInfo />
            <TableHeader title="کلاس های پایان یافته" discription="" />
            <TableMaker data={TableData} />
        </div>
    )
}

export default StudentEndedClasses