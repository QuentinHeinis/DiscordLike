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
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  options,
  disabled,
  required
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
          text-neutral-900
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <select id={id}
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