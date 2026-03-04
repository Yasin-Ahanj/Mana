"use client";

import { SearchNormal1 } from "iconsax-reactjs";

type SearchProps = {
    title: string
    placeholder: string
}

const PersonalId = ({title , placeholder} : SearchProps) => {
    return (
        <div className="w-[90%] mt-[1em] mx-auto text-right">
            <h1 className="font-semibold">{title}</h1>
            <div className="flex justify-between  mt-[1em] border rounded-[12px] items-center p-[0.5em]">
                <SearchNormal1
                    size={18}
                    color="#48484D"
                />
                <input className="focus:outline-none w-[90%] text-right " type="text" placeholder={placeholder} />

            </div>

        </div>
    )
}

export default PersonalId