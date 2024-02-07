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
  required,
  errors,
  type = 'text',
  disabled,
  ...props
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
          text-gray-900
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...props}
          {...register(id, { required })}
          className={`
            form-input
            block 
            w-full 
            border-0 
            py-1.5
            shadow-sm 
            ring-1
            ring-gray-500
            placeholder:text-gray-400
            outline-none
            focus:border-gray-500
            text-white
            sm:text-sm 
            sm:leading-6
            rounded-md bg-gray-600 h-10 px-2`}
        />
      </div>
    </div>
   );
}
 
export default Input;