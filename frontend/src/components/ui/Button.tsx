import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "../../utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> & {
		icon?: ReactNode;
		};

		const buttonVariants = cva(
		"inline-flex items-center justify-center rounded-lg font-medium transition-colors",
		{
		variants: {
		variant: {
		primary: "bg-indigo-600 text-white hover:bg-indigo-700",
		secondary: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
		ghost: "bg-transparent text-gray-600 hover:bg-gray-50",
		},
		size: {
		sm: "px-3 py-1.5 text-sm gap-1.5",
		md: "px-4 py-2 text-sm gap-2",
		lg: "px-5 py-2.5 text-base gap-2",
		},
		},
		defaultVariants: {
		variant: "primary",
		size: "md",
		},
		},
		);

		export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
			({ className, variant, size, icon, children, ...props }, ref) => {
			return (
			<button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
				{icon && <span className="flex-shrink-0">{icon}</span>}
				{children}
			</button>
			);
			},
			);

			Button.displayName = "Button";

			export { buttonVariants };
