'use client';

// import clsx from "clsx";
import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  options: {value: string, label: string}[];
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
  disabled?: boolean;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  options,
  disabled,
  required,
  fullWidth
}) => {
  return ( 
    <div>
      <label 
        htmlFor={id} 
        className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-white
        "
      >
        {label}
      </label>
      <div className="mt-2 flex w-full">
        <select id={id}
          className={`
            block 
            w-full 
            border-0 
            py-1.5
            shadow-sm 
            ring-1
            ring-neutral-500
            placeholder:text-neutral-400
            outline-none
            focus:border-neutral-500
            text-white
            sm:text-sm 
            sm:leading-6
            rounded-md bg-neutral-600 h-10 px-2
            ${fullWidth && 'w-full'}
            `}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
        >
          {
            options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))
          }
        </select>
      </div>
    </div>
   );
}
 
export default Input;