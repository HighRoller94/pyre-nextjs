import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { FiSearch } from "react-icons/fi";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, onChange, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <FiSearch size={20} className="text-neutral-400 absolute top-[25%] left-3 md:top-[25%] md:left-4" />
        <input
          type={type}
          className={twMerge(
            `
        flex 
        items-center
        w-full 
        rounded
        md:rounded-full  
        bg-neutral-700
        md:bg-neutral-900
        border
        border-transparent
        px-6 
        py-3 
        pl-11
        md:pl-12
        text-sm 
        file:border-0 
        file:bg-transparent 
        file:text-sm 
        file:font-medium 
        placeholder:text-neutral-400 
        disabled:cursor-not-allowed 
        disabled:opacity-50
        focus:outline-none
      `,
            disabled && "opacity-75",
            className
          )}
          onChange={onChange}
          disabled={disabled}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
