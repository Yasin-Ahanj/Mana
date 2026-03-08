import React from "react";

// تایپ داده‌های ورودی
type TableData = {
    tableInfo: {
        nameOfColumns: string[]; // آرایه‌ای از نام ستون‌ها
        countOfColumns: number;  // تعداد ستون‌ها
        orders: string[];
        linksName: string[];
    };
    tableData: {
        date: number;
        name: string;
        national_code: string;
        mobile: string;
    }[]; // آرایه‌ای از داده‌ها برای هر ردیف
};

// کامپوننت TableMaker
const TableMaker = ({ data }: { data: TableData }) => {
    // داده‌های جدول
    const { tableInfo, tableData } = data;

    return (
        <div className="w-[90%] mt-[1em] mx-auto border rounded-[12px]">
            {/* جدول */}
            <table className="w-full  rounded-[12px] overflow-hidden border">
                {/* سرستون‌ها */}
                <thead>
                    <tr>
                        {tableInfo.nameOfColumns.map((column, index) => (
                            <th key={index} className="p-[8px] border bg-[#000]/6">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* داده‌های جدول */}
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {/* {
                                tableInfo.linksName.map((item , index) => (
                                    
                                    row[item]
                                ))
                            } */}

                            {
                                tableInfo.orders.map((value, index) => (



                                    <td className="p-[8px] border text-center" key={index}>
                                        {
                                            tableInfo.linksName.length == 0 ? <span>{row[value]}</span> : (

                                                tableInfo.linksName.map((item , index) => (

                                                    // console.log(item)

                                                    value == item ? (
                                                        <a href={row[value]}>دانلود</a>
                                                        


                                                    ) : (

                                                        <span>
                                                            {row[value]}
                                                        </span>
                                                    )

                                                    

                                                ))
                                            )
                                        }


                                    </td>
                                ))

                            }

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableMaker;