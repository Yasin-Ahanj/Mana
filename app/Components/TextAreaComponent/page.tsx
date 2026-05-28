type TextInputProps = {
    placeholder: string;
    style: string;
    name: string;
    labelTxt: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    containerStyle?: string;

};

const TextAreaComponent = ({ placeholder, style, name, labelTxt, onChange, value, containerStyle }: TextInputProps) => {
    return (
        <div className={containerStyle}>
            <label className="flex gap-1" htmlFor={name}>
                <span className="text-[#FF0000]">
                    *
                </span>
                <span>
                    {labelTxt}
                </span>
            </label>
            <textarea className={style}  placeholder={placeholder} value={value} onChange={onChange} id={name} name={name} />
        </div>
    )
};

export default TextAreaComponent;