"use client"

import { Eye, EyeSlash } from "iconsax-reactjs";
import { useState } from "react";

type TextInputProps = {
    placeholder: string;
    style: string;
    name: string;
    labelTxt: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    containerStyle?: string;

};

const PasswordInput = ({ placeholder, style, name, labelTxt, onChange, value, containerStyle }: TextInputProps) => {
    const [isTxtShowable, setIsTxtShowable] = useState(false)
    const changeShowableOfTxt = () => {
        setIsTxtShowable(!isTxtShowable)
    }
    return (
        <div className={containerStyle}>
            <div className="flex flex-end gap-4 items-center">
                {
                    isTxtShowable == true ? <EyeSlash size={16} color="#F89535" onClick={changeShowableOfTxt} /> : <Eye size={16} color="#F89535" onClick={changeShowableOfTxt} />
                }

                <label className="flex gap-1" htmlFor={name}>
                    <span className="text-[#FF0000]">
                        *
                    </span>
                    <span>
                        {labelTxt}
                    </span>
                </label>
            </div>

            <input className={style} type={`${isTxtShowable == true ? 'text' : 'password'}`} placeholder={placeholder} value={value} onChange={onChange} id={name} name={name} />
        </div>
    )
};

export default PasswordInput;