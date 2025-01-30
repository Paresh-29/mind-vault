import { cva, VariantProps } from "class-variance-authority"
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react"
import { cn } from "../../utils/cn";


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: ReactNode;
  }

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium",
  {
    variants: {
      variant: {
        "primary": "bg-indigo-600 text-white hover:bg-indigo-700",
        "secondary": "bg-indigo-100 text-indigo-600 hover:bg-indigo-200",
      },
      size: {
        sm: "px-3 py-1 text-sm gap-1",
        md: "px-4 py-2 text-base gap-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    }
  }
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon}
        {children}
      </button>
    )
  }
);

Button.displayName = "Button";

export { buttonVariants };
