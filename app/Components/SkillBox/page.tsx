"use client"
const SkillBox = ({ name }: { name: string }) => {
    return (
        <div className="flex items-center gap-2 mt-4 bg-[#D9D9D9]/59  rounded-[5px] justify-center md:text-[24px] h-[80px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
            <span className="text-[#000]/50">{name}</span>
        </div>
    )
}

export default SkillBox