"use client"
import Link from "next/link";

type NavLink = {
    name: string;
    url: string;
};

type CategoryLearningInNavProps = {
    name: string;
    links: NavLink[];
    order: string;
};

const CategoryLearningInNav = ({ name, links, order }: CategoryLearningInNavProps) => {
    return (
        <div className={`flex flex-col items-end ${order}`}>
            <span className="text-[16px] text-[#000] bold">{name}</span>

            <ul className="flex flex-col mt-2 gap-1">
                {links.map((link , index) => (
                    <li key={index} className="text-[#48484D] text-right">
                        <Link href={`Pages/${link.url}`}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryLearningInNav;
