import Navbar from "@/app/Components/Navbar/page"
import NavbarLogin from "@/app/Components/NavbarLogin/page"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import PersonalId from "@/app/Components/PesonalId/page"
import TableMaker from "@/app/Components/TableMaker/page"

const Askfordata = () => {

    const TableData = {
        tableInfo : {
            nameOfColumns: ["تاریخ" , "نام" , "کد ملی" , "شماره موبایل"],
            countOfColumns: 4
        },
        tableData : [
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                mobile: "0914636241"
            },
            {
                date: 1985,
                name: "elahe",
                national_code: "245754854",
                mobile: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                mobile: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                mobile: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                mobile: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                mobile: "0914636241"
            },
            {
                date: 1995,
                name: "elahe",
                national_code: "245754854",
                mobile: "0914636241"
            },


        ]
    }

    return(
        <div>
            <NavbarPersonalInfo />
            <PersonalId title="استعلام اطلاعات شخص" placeholder="کدملی / شماره موبایل / نام" />
            <TableMaker data={TableData} />
        </div>
    )
}
export default Askfordata