import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        //DOC: Put in doc
        default: "bg-background text-foreground",
        error:
          "border-error-600/50 bg-error-300/50 text-error-700 dark:border-error-500 [&>svg]:text-error-700",
        success:
          "border-success-600/50 bg-success-300/50 text-success-700 dark:border-success-500 [&>svg]:text-success-700",
        warning:
          "border-warning-600/50 bg-warning-300/50 text-warning-700 dark:border-warning-500 [&>svg]:text-warning-700",
        primary:
          "border-primary-600/50 bg-primary-300/50 text-primary-700 dark:border-primary-500 [&>svg]:text-primary-700",

        //Custom colors from global.scss and tailwind.config
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        //default colors example
        emerald:
          "border-emerald-500/50 text-emerald-500 dark:border-emerald-500 [&>svg]:text-emerald-500",
        gray: "border-gray-500/50 text-gray-500 dark:border-gray-500 [&>svg]:text-gray-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
