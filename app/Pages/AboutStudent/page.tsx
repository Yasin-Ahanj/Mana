import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import TableHeader from "@/app/Components/TableHeader/Page"
import TableMaker from "@/app/Components/TableMaker/page"
const AboutStudent = () => {
    const TableData = {
        tableInfo: {
            nameOfColumns: ["شماره موبایل", "کد ملی", "نام", "تاریخ"],
            countOfColumns: 4,
            orders: ["mobile", "national_code", "name", "date"],
            linksName: []
        },
        tableData: [
            {
                date: 1995,
                national_code: "245754854",
                name: "elahe",
                mobile: "0914636241",
            },
            {
                mobile: "0914636241",
                national_code: "245754854",
                name: "elahe",
                date: 1995,
            },
            {
                mobile: "0914636241",
                national_code: "245754854",
                name: "elahe",
                date: 1995,
            },
            {
                mobile: "0914636241",
                national_code: "245754854",
                name: "elahe",
                date: 1995,
            },
            {
                mobile: "0914636241",
                national_code: "245754854",
                name: "elahe",
                date: 1995,
            },
            {
                mobile: "0914636241",
                national_code: "245754854",
                name: "elahe",
                date: 1995,
            },
            {
                mobile: "0914636241",
                national_code: "245754854",
                name: "elahe",
                date: 1995,
            },
        ]

    }

    const TableData1 = {
        tableInfo: {
            nameOfColumns: ["عملیات", "نام دوره"],
            countOfColumns: 2,
            orders: ["national_code", "name"],
            linksName: []
        },
        tableData: [
            {
                national_code: "245754854",
                name: "elahe",
            },
            {
                national_code: "245754854",
                name: "elahe",
            },

        ]
    }


    const TableData2 = {
        tableInfo: {
            nameOfColumns: ["نمره تمرین", "فایل پاسخ", "فایل تکلیف", "ددلاین", "تاریخ"],
            countOfColumns: 5,
            orders: ["score", "answer_file", "do_file", "dead_line", "date"],
            linksName: ["answer_file", "do_file"]
        },
        tableData: [
            {
                score: "11",
                dead_line: 1406,
                answer_file: "answerFile",
                do_file: "file1",
                date: 1995,
            },
            {
                score: "19",
                dead_line: 1406,
                answer_file: "answerFile",
                do_file: "file2",
                date: 1995,
            },
            {
                score: "18",
                dead_line: 1406,
                answer_file: "answerFile",
                do_file: "file3",
                date: 1995,
            },
            {
                score: "17",
                dead_line: 1406,
                answer_file: "answerFile",
                do_file: "file4",
                date: 1995,
            },
            {
                score: "15",
                dead_line: 1406,
                answer_file: "answerFile",
                do_file: "file5",
                date: 1995,
            },
            {
                score: "18",
                dead_line: 1406,
                answer_file: "answerFile",
                do_file: "file6",
                date: 1995,
            },


        ]

    }


    const TableData3 = {
        tableInfo: {
            nameOfColumns: ["نمره تمرین", "فایل پاسخ", "فایل تکلیف", "ددلاین", "تاریخ"],
            countOfColumns: 5,
            orders: ["score", "answer_file", "do_file", "dead_line", "date"],
            linksName: ["answer_file", "do_file"]

        },
        tableData: [
            {
                score: "11",
                dead_line: 1406,
                answer_file: "answerFile",
                do_file: "file1",
                date: 1995,
            },
            {
                score: "19",
                dead_line: 1406,
                answer_file: "answerFile",
                do_file: "file2",
                date: 1995,
            },
            {
                score: "18",
                dead_line: 1406,
                answer_file: "answerFile",
                do_file: "file3",
                date: 1995,
            },
            {
                score: "17",
                dead_line: 1406,
                answer_file: "answerFile",
                do_file: "file4",
                date: 1995,
            },
            {
                score: "15",
                dead_line: 1406,
                answer_file: "answerFile",
                do_file: "file5",
                date: 1995,
            },

        ]

    }


    const TableData4 = {
        tableInfo: {
            nameOfColumns: ["غایب", "حاضر", "تاریخ کلاس"],
            countOfColumns: 3,
            orders: ["absent", "present", "class_date"],
            linksName: []

        },
        tableData: [
            {
                absent: "absent",
                present: "present",
                class_date: 1995,
            },
            {
                absent: "absent",
                present: "present",
                class_date: 1995,
            },
            {
                absent: "absent",
                present: "present",
                class_date: 1995,
            },
            {
                absent: "absent",
                present: "present",
                class_date: 1995,
            },
            {
                absent: "absent",
                present: "present",
                class_date: 1995,
            },
        ]

    }



    return (
        <div>
            <NavbarPersonalInfo />
            <TableHeader title="اطلاعات شخص" discription="" />
            <TableMaker data={TableData} />
            <TableHeader title="دوره های ثبت نامی" discription="" />
            <TableMaker data={TableData1} />
            <TableHeader title="تکلیف دانشجو" discription="دوره آموزش برنامه نویسی" />
            <TableMaker data={TableData2} />
            <TableHeader title="" discription="دوره آموزش  بازار های مالی" />
            <TableMaker data={TableData3} />
            <TableHeader title="حضور غیاب دانشجو" discription="دوره آموزش برنامه نویسی" />
            <TableMaker data={TableData4} />
        </div>
    )
}


export default AboutStudent