import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import PersonalId from "@/app/Components/PesonalId/page"
import TableHeader from "@/app/Components/TableHeader/Page"
import TableMaker from "@/app/Components/TableMaker/page"


const Documents = () => {
        const TableData = {
        tableInfo : {
            nameOfColumns: ["فایل مدرک", "کد ملی"  , "نام" , "تاریخ"],
            countOfColumns: 4,
            orders: ["document_file" ,  "national_code" , "name" , "date"]
        },
        tableData : [
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                document_file: "0914636241"
            },
            {
                date: 1985,
                name: "elahe",
                national_code: "245754854",
                document_file: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                document_file: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                document_file: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                document_file: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                document_file: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                document_file: "0914636241"
            },


        ]
    }

    return(
        <div>
            <NavbarPersonalInfo />
            <PersonalId title="مشاهده کل مدارک" placeholder="کد ملی/نام" />
            <TableHeader title="کلیه مدارک صادر شده"/>
            <TableMaker data={TableData}/>
        </div>
    )
} 

export default Documents