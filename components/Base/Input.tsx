import { forwardRef } from "react";
import { twMerge } from "tailwind-merge"
import { FiSearch } from "react-icons/fi";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  type,
  disabled,
  onChange,
  ...props
}, ref) => {
  return (
    <input
      type={type}
      className={twMerge(
        `
        flex 
        w-full 
        rounded-full  
        bg-neutral-900
        border
        border-transparent
        px-6 
        py-3 
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
        disabled && 'opacity-75',
        className
      )}
      onChange={onChange}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  )
});

Input.displayName = "Input";

export default Input