import { Add, AddCircle, MinusCirlce } from "iconsax-reactjs"
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

const BuffetItemBox = ({ item , onChange }: Item) => {

    const formatPrice = (price: number): string => {
        if (!price) return "0";
        return price.toLocaleString("fa-IR");
    };

    const [count, setCount] = useState(0)


    const increaseItem = () => {
        const newCount = count + 1;
        setCount(newCount);
        onChange(item.id, newCount);
    }

    const decreaseItem = () => {
        if (count > 0) {
            const newCount = count - 1;
            setCount(newCount);
            onChange(item.id, newCount);
        }
    }

    return (
        <div className="flex items-center justify-around gap-4 border p-8 rounded-lg">
            <span>{count}</span>
            <div className="flex gap-4">
                <AddCircle
                    size={32}
                    color="#000"
                    onClick={increaseItem}
                    className="hover:cursor-pointer"
                />
                <MinusCirlce
                    size={32}
                    color="#000"
                    onClick={decreaseItem}
                    className="hover:cursor-pointer"
                />
            </div>
            <span dir="rtl">{formatPrice(item.price)} تومان</span>
            <span>{item.name}</span>
        </div>
    )
}
export default BuffetItemBox