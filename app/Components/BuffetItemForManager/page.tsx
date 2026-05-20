import { Add, AddCircle, MinusCirlce } from "iconsax-reactjs"
import Link from "next/link";
import { useState } from "react";


interface BuffetItem {
    price: number;
    name: string;
    id: number
}

type Item = {

    item: BuffetItem
    onChange: (id: number, count: number) => void;
}

const BuffetItemForManager = ({ item , onChange }: Item) => {

    const formatPrice = (price: number): string => {
        if (!price) return "0";
        return price.toLocaleString("fa-IR");
    };

    const [count, setCount] = useState(0)



    return (
        <Link href={`/Pages/BuffetItem/${item.id}`} className="flex items-center justify-around gap-4 border p-8 rounded-lg">
            <span dir="rtl">{formatPrice(item.price)} تومان</span>
            <span>{item.name}</span>
        </Link>
    )
}
export default BuffetItemForManager