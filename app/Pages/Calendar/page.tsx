"use client"
import NavbarPersonalInfo from "@/app/Components/NavbarPersonalInfo/page"
import TableHeader from "@/app/Components/TableHeader/Page"
import Link from 'next/link'; 

const Calendar = () => {

    return (

        <div className="h-[100vh] w-[100%] bg-[#000000]/50">
            <NavbarPersonalInfo />
            <TableHeader title="کلاس های فعال" discription="" />
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center bg-[white] w-[80%] h-[70vh] gap-[4em]">
                    <Link href=""> 
                        <h1 className="font-semibold text-[48px] cursor-pointer hover:underline">تقویم</h1>
                    </Link>
                    <Link href="">
                        <p className="font-semibold text-[24px] cursor-pointer hover:underline">لطفا به شاگردان نیز اطلاع رسانی شود</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Calendar