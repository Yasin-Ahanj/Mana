import React from "react";

// تایپ داده‌های ورودی
type TableRow = {
    date: number;
    name: string;
    national_code: string;
    mobile: string;
    [key: string]: any; // برای دسترسی داینامیک به ستون‌ها
};

type TableData = {
    tableInfo: {
        nameOfColumns: string[];
        countOfColumns: number;
        orders: string[];
        linksName: string[];
    };
    tableData: TableRow[];
};

// کامپوننت TableMaker
const TableMaker = ({ data }: { data: TableData }) => {

    const { tableInfo, tableData } = data;

    return (
        <div className="w-[90%] mt-[1em] mx-auto border rounded-[12px]">
            <table className="w-full rounded-[12px] overflow-hidden border">

                {/* Table Header */}
                <thead>
                    <tr>
                        {tableInfo.nameOfColumns.map((column, index) => (
                            <th
                                key={index}
                                className="p-[8px] border bg-[#000]/6 text-center"
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>

                            {tableInfo.orders.map((value, index) => {

                                const cellValue = row[value];

                                return (
                                    <td
                                        key={index}
                                        className="p-[8px] border text-center"
                                    >
                                        {tableInfo.linksName.includes(value) ? (
                                            <a
                                                href={cellValue}
                                                className="text-blue-600 underline"
                                            >
                                                دانلود
                                            </a>
                                        ) : (
                                            <span>{cellValue}</span>
                                        )}
                                    </td>
                                );
                            })}

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default TableMaker;