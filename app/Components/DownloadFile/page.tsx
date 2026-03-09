"use client"
import { DocumentUpload } from "iconsax-reactjs";
import Link from "next/link";

type Downloadfile = {
    fileName: string;
    fileLink: string;
}


const DownloadFile = ({fileName , fileLink} : Downloadfile) => {

    return (
        <div className="flex items-center gap-4">
            <DocumentUpload
                size={32}
                color="#F89535"
            />
            <Link href={fileLink} target="_blank">
                {fileName}
            </Link>
        </div>
    )

}


export default DownloadFile
