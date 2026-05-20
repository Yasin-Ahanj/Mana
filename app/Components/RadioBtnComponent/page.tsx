"use client"

interface Option {
  value: string | number | boolean;
  label: string;
}

type RadioInputProps = {
  options: Option[];
  onChange: (value: string | number | boolean) => void;
  value: string | number | boolean;
  name: string;
  label?: string;
  containerStyle?: string;
  isNessesary?: boolean;
};

const RadioInputComponent = ({
  options,
  onChange,
  value,
  name,
  label,
  containerStyle,
  isNessesary,
}: RadioInputProps) => {
  return (
    <div className={containerStyle}>
      {label && (
        <label>
          {isNessesary && <span className="text-[#ff0000]">*</span>}
          {label}
        </label>
      )}

      <div className="flex flex-col  gap-2 mt-2">
        {options.map((option, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={String(option.value)}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioInputComponent;