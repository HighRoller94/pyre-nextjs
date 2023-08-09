import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(( {
    className,
    children,
    disabled,
    type="button",
    ...props
}, ref) => {
    return (
        <button
        type={type}
        className={twMerge(`w-full rounded-full bg-orange-500 border border-transparent px-4 py-4 disabled:cursor-not-allowed disabled:opacity-50 text-neutral-50 font-bold hover:opacity-75 transition`,
        className)}
        disabled={disabled}
        ref={ref}
        {...props}
        >
            {children}
        </button>
    )
})

Button.displayName="Button"


export default Button;
