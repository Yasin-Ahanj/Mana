"use client"
import { useState } from "react";

type AccessesComponentsProps = {
    styleContainer: string;
    StyleBtn: string;
    txt: string;
    changeBg: () => void;
}
const AccessesComponents = ({ styleContainer, txt, changeBg , StyleBtn }: AccessesComponentsProps) => {
    return (
        <div className={styleContainer} onClick={changeBg}>
            <span  >{txt}</span>
            <div className={StyleBtn}>

            </div>
        </div>
    )
}
export default AccessesComponents