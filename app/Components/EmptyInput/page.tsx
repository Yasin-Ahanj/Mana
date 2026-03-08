"use client";

type SearchProps = {
    title: string
    placeholder: string
}

const EmptyInput = ({title , placeholder} : SearchProps) => {
    return (
        <div className="w-[90%] mt-[2em] mx-auto text-right">
            <h2 className="font-semibold">{title}</h2>
            <div className="flex justify-between  mt-[1em] border rounded-[12px] items-center p-[0.5em]">
                <input className="focus:outline-none w-[95%] text-right " type="text" placeholder={placeholder} />

            </div>

        </div>
    )
}

export default EmptyInput