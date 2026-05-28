"use client";
import { DocumentUpload } from "iconsax-reactjs";

type UploadFileComponentProps = {
    fileName: string;
    FileId: string;
    labelTxt: string;
    isUrgent?: boolean;
    heightOfInput?: string;
    widthOfInput?: string;
    hasBorder?: boolean;
    inputTxt?: string;
    uniqueStyle?: string;
    onFileSelect?: (file: File) => void;
};

const UploadFileComponent = ({
    fileName,
    FileId,
    labelTxt,
    isUrgent,
    heightOfInput,
    widthOfInput,
    hasBorder,
    inputTxt,
    uniqueStyle,
    onFileSelect
}: UploadFileComponentProps) => {

    return (
        <div className={`h-[100px] ${widthOfInput}`}>
            <div className="flex gap-1 mt-1 justify-end">
                <span className={`${isUrgent ? 'text-[#FF0000]' : 'text-[#000]/50'}`}>
                    {isUrgent ? "*" : "(غیر ضروری)"}
                </span>
                <label htmlFor={FileId}>{labelTxt}</label>
            </div>

            <div className={`relative w-full mt-1 flex flex-col ${heightOfInput}`}>
                <div className={`flex ${uniqueStyle} items-center absolute w-full h-full`}>
                    <DocumentUpload size={32} color="#F89535" />
                    <span>{inputTxt}</span>
                </div>

                <input
                    type="file"
                    name={fileName}
                    id={FileId}
                    className={`absolute ${hasBorder ? 'border' : ''} rounded-[12px] w-full h-full text-[0px] cursor-pointer`}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && onFileSelect) {
                            onFileSelect(file);
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default UploadFileComponent;