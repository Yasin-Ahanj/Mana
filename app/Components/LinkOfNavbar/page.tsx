"use client"
import { ArrowLeft2 } from "iconsax-reactjs";
import Link from "next/link";
import { useState } from "react";

type LinkOfNavbarProps = {
  name: string;
  links: { name: string; url: string }[];
  onSendData: (data: String) => void;
  key: number;
  desiredLink: boolean;

};

const LinkOfNavbar = ({ name, links, onSendData, desiredLink }: LinkOfNavbarProps) => {



  const handleClick = () => {
    onSendData(name);
  };

  return (
    <>
      {desiredLink ? (
        links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="bg-transparent w-[90%] mx-auto h-[68px] flex items-center justify-end hover:cursor-pointer hover:underline"
          >
            <span className="text-[16px]">{link.name}</span>
          </Link>
        ))
      ) : (
        <div className="bg-transparent w-[90%] mx-auto h-[68px] flex items-center justify-between hover:cursor-pointer hover:underline" onClick={handleClick}
        >
          <ArrowLeft2 size={24} color="#48484D" />
          <span className="text-[16px]">{name}</span>
        </div>
      )}
    </>
  );
};

export default LinkOfNavbar;
