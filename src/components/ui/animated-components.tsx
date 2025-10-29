import React from "react";
import { animationClasses } from "../../lib/animations";

// Loading spinner component
export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${animationClasses.spin} border-2 border-white/30 border-t-white rounded-full`}
    />
  );
}

// Skeleton loader component
export function SkeletonLoader({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-white/20 rounded ${className}`} />;
}

// Animated card wrapper
export function AnimatedCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`${animationClasses.staggerItem} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Animated button wrapper
export function AnimatedButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const baseClasses =
    "transition-all duration-200 hover:scale-105 active:scale-95 focus:scale-95";

  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
}
