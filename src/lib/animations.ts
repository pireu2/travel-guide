import { useEffect, useState } from "react";

// Animation utilities for the travel guide app

export const animationClasses = {
  // Page transitions
  fadeIn: "animate-in fade-in duration-500",
  fadeOut: "animate-out fade-out duration-300",
  slideInFromRight: "animate-in slide-in-from-right duration-500",
  slideInFromLeft: "animate-in slide-in-from-left duration-500",
  slideOutToRight: "animate-out slide-out-to-right duration-300",
  slideOutToLeft: "animate-out slide-out-to-left duration-300",

  // Card animations
  cardHover:
    "transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20",
  cardClick: "active:scale-95 transition-transform duration-150",

  // Button animations
  buttonHover: "transition-all duration-200 hover:scale-105 active:scale-95",
  buttonPress: "animate-pulse",

  // Staggered animations
  staggerItem:
    "animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both",

  // Loading animations
  spin: "animate-spin",
  pulse: "animate-pulse",
  bounce: "animate-bounce",

  // Micro-interactions
  wiggle: "animate-wiggle",
  shake: "animate-shake",
  heartbeat: "animate-heartbeat",
};

// Custom hook for staggered animations
export function useStaggeredAnimation(items: any[], delay: number = 100) {
  const [animatedItems, setAnimatedItems] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedItems(items);
    }, delay);

    return () => clearTimeout(timer);
  }, [items, delay]);

  return animatedItems;
}

// Custom hook for page transitions
export function usePageTransition(isVisible: boolean) {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isVisible) {
      setAnimationClass(animationClasses.fadeIn);
    } else {
      setAnimationClass(animationClasses.fadeOut);
    }
  }, [isVisible]);

  return animationClass;
}

// Utility function for creating staggered delays
export function createStaggeredDelays(
  count: number,
  baseDelay: number = 100
): number[] {
  return Array.from({ length: count }, (_, index) => index * baseDelay);
}

// Animated counter hook for numbers
export function useAnimatedCounter(end: number, duration: number = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return count;
}
