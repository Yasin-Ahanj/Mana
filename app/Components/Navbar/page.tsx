"use client"
import Image from "next/image";
import { HamburgerMenu, SearchNormal, ArrowDown2, CloseCircle, ShoppingCart, ArrowLeft2, Logout } from "iconsax-reactjs";
import Logo from "@/public/Images/navbar/logo.png";
import Link from "next/link";
import LinkOfNavbar from "../LinkOfNavbar/page";
import LineOfBreakLinks from "../LineOfBreakLinks/page";
import Skeleton from "../Skeleton/Skeleton";
import { use, useEffect, useState } from "react";
import CategoryLearningInNav from "../CategoryLearningInNav/page";
import CryptoJS from "crypto-js";
import { url } from "inspector";

const Navbar = () => {
    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
    const [hoverToCourses, setHoverToCourses] = useState(false);
    const [hoverToPermissions, setHoverToPermissions] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [countItemsInShoppingCart, setCountItemsInShoppingCart] = useState(0);
    const [categories, setCategories] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [isDisiredLink, setIsDisiredLink] = useState(false);
    const [desiredName, setDesiredName] = useState("");
    useEffect(() => {
        async function getData() {

            const encryptedToken = localStorage.getItem("token");
            if (!encryptedToken) {
                const res = await fetch("http://127.0.0.1:8000/api/v1/get-initial-data-without-auth", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/vnd.api+json",
                        "Accept": "application/vnd.api+json",
                    },
                });
                const data = await res.json();
                if (res.status === 200) {
                    setIsJoined(false);
                    setCategories(data.categories);
                } else {
                    setIsJoined(false);
                }
            } else {
                const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, "mana");
                const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);

                if (!encryptedToken) {
                    setIsJoined(false);
                    return;
                }

                const res = await fetch("http://127.0.0.1:8000/api/v1/get-initial-data", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/vnd.api+json",
                        "Authorization": `Bearer ${decryptedToken}`,
                        "Accept": "application/vnd.api+json",
                    },
                });
                const data = await res.json();
                if (res.status === 200) {
                    setIsJoined(true);
                    setCategories(data.categories);
                    setPermissions(data.permissions);
                } else {
                    setIsJoined(false);
                }
            }
        }
        getData();
    }, []);

    const handleLinkData = (data: string) => {
        setDesiredName(data);
        setIsDisiredLink(true);
    }

    const closeHamburgerMenu = () => {
        setIsDisiredLink(false);
        setDesiredName("");
        setIsHamburgerMenuOpen(false);
    }

    const closeLinkingArea = () => {
        setIsDisiredLink(false);
        setDesiredName("");
    }

    const logoutClick = () => {
        localStorage.clear();
        setIsJoined(false);
        closeHamburgerMenu();
    }

    return (
        <div className="border-b-[1px] border-[#48484D]/40 w-full relative">
            <div className="flex gap-8 justify-between px-4 h-[71px] w-full md:w-4/5 md:mx-auto">
                <div className="flex gap-4 items-center">
                    <Link href="/Pages/Login" className={`flex justify-center items-center w-[144px] h-[36px] text-[#F89535] border-[1px] border-[#F89535] rounded-[5px] text-[16px] ${isJoined ? "hidden" : ""}`}>عضویت رایگان</Link>
                    <div className={`flex gap-4 hover:cursor-pointer ${isJoined ? "flex" : "hidden"} items-center`}>
                        <span className="text-[16px] text-[#48484D]"  onClick={logoutClick}>خروج</span>

                        <div className="relative">
                            <div className="w-[28px] h-[28px] text-[#fff] rounded-full bg-[#F21717] absolute top-0 left-0 flex justify-center items-center">
                                {countItemsInShoppingCart}
                            </div>
                            <ShoppingCart size={48} color="#F89535" />
                        </div>
                        <Link href="" className="text-[16px] text-[#48484D] flex items-center gap-2 hidden md:flex" onMouseEnter={() => { setHoverToPermissions(true); setHoverToCourses(false); }}>
                            <ArrowDown2 size={24} color="#48484D" />
                            <span className="text-[16px] text-[#48484D]">دسترسی ها</span>
                        </Link>
                    </div>
                    <SearchNormal size={18} color="#48484D" className="lg:hidden" />
                </div>
                <div className="hidden h-full md:flex items-center md:gap-[18px]">
                    <div className="hidden lg:flex shadow-[0_0_4px_0_rgba(0,0,0,0.3)] rounded-3xl p-1 lg:w-[306px] 2xl:w-[446px] 2xl:text-[]">
                        <div className="bg-[#F89535] rounded-full w-fit p-1">
                            <SearchNormal size={24} color="#fff" />
                        </div>
                        <input type="text" className="rounded-3xl text-right pr-2 w-full md:text-[16px] focus:border-0 focus:outline-none" placeholder="جستجو" />
                    </div>
                    <Link href="" className="text-[16px] text-[#48484D]">مقالات</Link>
                    <div className="flex gap-4 items-center justify-center hover:cursor-pointer" onMouseEnter={() => { setHoverToCourses(true); setHoverToPermissions(false); }}>
                        <ArrowDown2 size={24} color="#48484D" />
                        <Link href="" className="text-[16px] text-[#48484D] w-[100px]">دوره ها</Link>
                    </div>
                </div>
                <div className="flex justify-around items-center gap-4">
                    <Link href="/" className="flex justify-center items-center gap-2 hover:cursor-pointer">
                        <h1 className="text-[24px] text-[#48484D]">مــانـا</h1>
                        <Image src={Logo} alt="آموزشگاه مانا" className="w-[51px] h-[51px]" />
                    </Link>
                    <HamburgerMenu onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)} size={32} color="#48484D" className="md:hidden hover:cursor-pointer" />
                </div>

            </div>
            {/* when hamburger opens */}
            <div className={`h-[100vh] w-[100%] fixed absolute z-10 top-0 left-0 bg-[#fff] md:hidden ${isHamburgerMenuOpen ? "block" : "hidden"}`}>
                <div className="grid grid-cols-3 items-center h-[72px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">

                    <div className="flex col-start-2  justify-center items-center gap-4 hover:cursor-pointer">
                        <h1 className="text-[36px] text-[#48484D]">مــانـا</h1>
                        <Image src={Logo} alt="آموزشگاه مانا" className="w-[51px] h-[51px]" />
                    </div>

                    <div className="flex col-start-3 justify-end pr-6">
                        <CloseCircle onClick={closeHamburgerMenu} size={32} color="#48484D" className="hover:cursor-pointer" />
                    </div>

                </div>
                <div className="flex flex-col gap-4">
                    {!isDisiredLink ? (
                        <>
                            <span className="text-right w-11/12 mx-auto mt-[1em] text-[#48484D]/80">
                                دوره های آموزشی
                            </span>

                            {categories.map((category: any, index: number) => (
                                <LinkOfNavbar
                                    key={index}
                                    name={category.name}
                                    links={category.categories.map((innerCategory: any) => ({
                                        name: innerCategory.name,
                                        url: innerCategory.route_path,
                                    }))}
                                    onSendData={handleLinkData}
                                    desiredLink={isDisiredLink}
                                />
                            ))}


                            {Object.keys(permissions).length > 0 && <LineOfBreakLinks />}
                            {Object.entries(permissions).map(
                                ([roleName, links]: [string, any[]], index: number) => (
                                    <LinkOfNavbar
                                        key={index}
                                        name={roleName}

                                        links={links.map(link => ({
                                            name: link.name,
                                            url: link.end_point,
                                        }))}
                                        onSendData={handleLinkData}
                                        desiredLink={isDisiredLink}
                                    />


                                )
                            )}

                            <LineOfBreakLinks />

                            <div className={`bg-transparent w-[90%] mx-auto h-[68px] flex items-center justify-end hover:cursor-pointer hover:underline ${isJoined ? 'flex' : 'hidden'} `} onClick={logoutClick}
                            >
                                <span className="text-[16px]">خروج</span>
                            </div>

                        </>
                    ) : (
                        <>
                            <div className="flex  flex-row w-11/12 mx-auto items-center mt-[1em]">
                                <div className="flex items-center hover:cursor-pointer" onClick={closeLinkingArea}>
                                    <ArrowLeft2 size={24} color="#6D6D71" />
                                    <span className="text-right   text-[#48484D]/80">بازگشت</span>
                                </div>
                                <span className="text-right w-11/12 mx-auto  text-[#48484D]/80">
                                    {desiredName}
                                </span>
                            </div>


                            {categories
                                .filter((category: any) => category.name === desiredName)
                                .map((category: any, index: number) => (
                                    <LinkOfNavbar
                                        key={index}
                                        name={category.name}
                                        links={category.categories.map((innerCategory: any) => ({
                                            name: innerCategory.name,
                                            url: innerCategory.route_path,
                                        }))}
                                        onSendData={handleLinkData}
                                        desiredLink={isDisiredLink}
                                    />
                                ))}

                            {Object.entries(permissions).filter(([roleName, links]: [string, any[]]) => roleName == desiredName).map(
                                ([roleName, links]: [string, any[]], index: number) => (
                                    <LinkOfNavbar
                                        key={index}
                                        name={roleName}

                                        links={links.map(link => ({
                                            name: link.name,
                                            url: link.end_point,
                                        }))}
                                        onSendData={handleLinkData}
                                        desiredLink={isDisiredLink}
                                    />
                                )
                            )}
                        </>
                    )}
                </div>

            </div>

            {/* when dore ha hovers */}
            <div className={`absolute bg-[#fff] h-fit w-full border-t-[1px] border-[#48484D]/40 z-10 hidden md:block  ${hoverToCourses ? "md:block" : "md:hidden"}`} onMouseLeave={() => setHoverToCourses(false)}>
                <div className="w-[80%] mx-auto  flex justify-between p-4">
                    {categories.map((category: any, index: number) => (
                        <CategoryLearningInNav
                            key={category.id}
                            order={`order-${index + 1}`}
                            name={category.name}
                            links={category.categories.map((innerCategory: any) => ({
                                name: innerCategory.name,
                                url: innerCategory.route_path,
                            }))}
                        />
                    ))}
                </div>
                <div className="border-t-[1px] border-[#48484D]/40  p-4 flex justify-end gap-4">
                    <Link href="Pages/Categories/Free" className="text-[16px] text-[#F89535] underline">دوره های رایگان</Link>
                    <span className="text-[16px] text-[#48484D]">میتونی از دوره های رایگان شروع کنی</span>
                </div>
            </div>
            <div className={`absolute bg-[#fff] h-fit w-full border-t-[1px] border-[#48484D]/40 z-10 hidden md:block  ${hoverToPermissions ? "md:block" : "md:hidden"}`} onMouseLeave={() => setHoverToPermissions(false)}>
                <div dir="rtl" className="w-[80%] mx-auto justify-items-center  grid grid-cols-4 grid-rows-1  p-4">
                    {Object.entries(permissions).map(
                        ([roleName, links]: [string, any[]], index: number) => (
                            <CategoryLearningInNav
                                key={roleName}
                                name={roleName}
                                order={`row-start-${index + 1}`}
                                links={links.map(link => ({
                                    name: link.name,
                                    url: link.end_point,
                                }))}
                            />
                        )
                    )}
                </div>
            </div>
            <div
                className={`bg-[#000]/10 w-full h-[100vh] absolute hidden md:block ${hoverToCourses || hoverToPermissions ? "md:block" : "md:hidden"}`}>
            </div>
        </div>
    );
};

export default Navbar;