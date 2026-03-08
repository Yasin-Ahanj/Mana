"use client"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import TableHeader from "@/app/Components/TableHeader/Page"
import TableMaker from "@/app/Components/TableMaker/page"

const PaymentsCondition = () => {

    const TableData = {
        tableInfo: {
            nameOfColumns: ["هزینه کلی", "تعداد", "نام آیتم", "تاریخ"],
            countOfColumns: 4,
            orders: ["cost", "number", "itemName", "date"],
            linksName: []

        },
        tableData: [
            {
                date: "1404/11/07",
                itemName: "rani",
                number: "1",
                cost: "65,000"
            },
            {
                date: 1985,
                itemName: "",
                number: "245754854",
                cost: "0914636241"
            },
            {
                date: 1995,
                itemName: "elahe",
                number: "245754854",
                cost: "0914636241"
            },
            {
                date: 1995,
                itemName: "elahe",
                number: "245754854",
                cost: "0914636241"
            },
            {
                date: 1995,
                itemName: "elahe",
                number: "245754854",
                cost: "0914636241"
            },
            {
                date: 1995,
                itemName: "elahe",
                number: "245754854",
                cost: "0914636241"
            },
            {
                date: 1995,
                itemName: "elahe",
                number: "245754854",
                cost: "0914636241"
            },


        ]
    }
    const costPayed = () => {
        console.log("click shod")
    }

    return (
        <div>
            <NavbarPersonalInfo />
            <h1 className="flex justify-center mt-4">مشاهده خرید های بوفه</h1>
            <TableHeader title="کلیه خرید های پرداخت نشده نگین خدایار" description="" />
            <TableMaker data={TableData} />
            <div className="ml-20 mt-2">
                <span>مبلغ کلی:150,000</span>
            </div>
            <div className="flex justify-center" >
                <span className=" bg-[#F89535] text-[white] mt-8 py-2 px-20 rounded-[10px]" onClick={costPayed}>پرداخت شد</span>
            </div>


        </div>
    )

}
export default PaymentsCondition