"use client";

// import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  type = "text",
  disabled,
  ...props
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-neutral-700 dark:text-neutral-100
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
            ring-neutral-500
            placeholder:text-neutral-400
            outline-none
            focus:border-neutral-500
            bg-neutral-300 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300
            sm:text-sm 
            sm:leading-6
            rounded-md  h-10 px-2`}
        />
      </div>
    </div>
  );
};

export default Input;
