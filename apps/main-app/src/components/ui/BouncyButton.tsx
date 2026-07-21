import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "../../utils/cn";

interface BouncyButtonProps extends HTMLMotionProps<"button"> {
  color?: "primary" | "secondary" | "success" | "accent" | "teal";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

export function BouncyButton({ color = "primary", size = "md", className, children, ...props }: BouncyButtonProps) {
  const colorClasses = {
    primary: "bg-primary shadow-primary-shadow text-white",
    secondary: "bg-secondary shadow-secondary-shadow text-slate-800",
    success: "bg-success shadow-success-shadow text-white",
    accent: "bg-accent shadow-accent-shadow text-white",
    teal: "bg-teal shadow-teal-shadow text-white",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-lg rounded-2xl",
    lg: "px-8 py-4 text-xl rounded-3xl",
    xl: "px-10 py-5 text-2xl rounded-[2rem]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "font-bold tracking-wider transition-colors",
        "shadow-bouncy active:shadow-bouncy-pressed",
        colorClasses[color],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
