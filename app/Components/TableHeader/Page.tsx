import React from 'react';

type TableHeader = {
    title: string;
    discription: string;
};

const TableHeader = ({ title,discription}: TableHeader) => {
    return (
        <div  className="w-[90%] mt-[2em] mx-auto text-right">
            <h2 className=" font-semibold">{title}</h2>
            <p className='pt-[20px] pr-[8px]'>{discription}</p>
        </div>
    );
};

export default TableHeader;