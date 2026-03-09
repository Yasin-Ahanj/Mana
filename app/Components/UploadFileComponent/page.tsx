"use client"
import { DocumentUpload } from "iconsax-reactjs";
import { useEffect } from "react"

type UploadFileComponentProps = {
    fileName: string;
    FileId: string;
    labelTxt: string;
    isUrgent?: boolean;
    heightOfInput?: string;
    widthOfInput?: string;
    hasBorder?: boolean;
    inputTxt?: string;
}
const UploadFileComponent = ({ fileName, FileId, labelTxt, isUrgent , heightOfInput , widthOfInput  , hasBorder , inputTxt}: UploadFileComponentProps) => {

    return (
        <div className={`h-[100px] ${widthOfInput}`}>
            <div className="flex gap-1 mt-1 justify-end ">
                <span className={` ${isUrgent == true ? 'text-[#FF0000]' : 'text-[#000]/50'} text-right`}>{isUrgent == true ? "*" : "(غیر ضروری)"}</span>
                <label htmlFor={FileId} className="text-right ">{labelTxt}</label>
            </div>

            <div className={`relative  w-[100%] mt-1   flex flex-col ${heightOfInput}`}>
                <div className="flex justify-around items-center absolute w-[100%] h-[100%]" >
                    <DocumentUpload
                        size={32}
                        color="#F89535"
                    />
                    <span>{inputTxt}</span>

                </div>
                <input type="file" name={fileName} id={FileId} className={`absolute ${hasBorder == true ? 'border' : ''} rounded-[12px] w-[100%]  hover:cursor-pointer h-[100%] text-[#000] text-[0px]`} />
            </div>

        </div>
    )
}
export default UploadFileComponent