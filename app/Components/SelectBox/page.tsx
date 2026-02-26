"use client"

import { ArrowDown } from "iconsax-reactjs";

interface option {
    value: string | number;
    label: string;
}
type SelectBoxProps = {
    options: option[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    style: string;
    label: string;
    name: string;
    containerStyle?: string;
    isNessesary?: boolean;
    optionsStyle?: string;
}
const SelectBox = ({ options, onChange, value, style, label, name, containerStyle, isNessesary, optionsStyle }: SelectBoxProps) => {

    return (
        <div className={containerStyle}>
            <label htmlFor={name}>{isNessesary && <span className="text-[#ff0000]">*</span>}{label}</label>
            <select onChange={onChange} className={style} value={value} name={name} id={name}>
                {
                    options.map((option: option, index: number) => {
                        return (
                            <option key={index} value={option.value} className={optionsStyle}>
                                {option.label}
                            </option>
                        )
                    })
                }
            </select>

            <ArrowDown
                size="16"
                color="#f89535"
                className="absolute bottom-[22%] left-3"
            />
        </div>

    )
}
export default SelectBox