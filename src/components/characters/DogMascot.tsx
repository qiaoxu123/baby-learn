"use client";

import { motion } from "framer-motion";

interface DogMascotProps {
  size?: number;
  className?: string;
  animate?: boolean;
  expression?: "happy" | "excited" | "sleepy";
}

export default function DogMascot({
  size = 120,
  className = "",
  animate = true,
  expression = "happy",
}: DogMascotProps) {
  return (
    <motion.div
      className={className}
      animate={animate ? { y: [0, -6, 0] } : {}}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="-50 -50 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body */}
        <ellipse cx="0" cy="20" rx="22" ry="25" fill="#8D6E63" />
        <ellipse cx="0" cy="22" rx="16" ry="18" fill="#EFEBE9" />

        {/* Tail */}
        <motion.path
          d="M18,25 Q32,15 28,0"
          stroke="#8D6E63"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          animate={animate ? {
            d: [
              "M18,25 Q32,15 28,0",
              "M18,25 Q36,10 25,-5",
              "M18,25 Q28,18 30,5",
              "M18,25 Q32,15 28,0",
            ],
          } : {}}
          transition={{ duration: 0.6, repeat: Infinity }}
        />

        {/* Head */}
        <circle cx="0" cy="-12" r="22" fill="#8D6E63" />

        {/* Ears - floppy */}
        <motion.ellipse
          cx="-22" cy="-15"
          rx="10" ry="16"
          fill="#6D4C41"
          transform="rotate(-20, -22, -15)"
          animate={animate ? { rotate: [-20, -15, -20] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.ellipse
          cx="22" cy="-15"
          rx="10" ry="16"
          fill="#6D4C41"
          transform="rotate(20, 22, -15)"
          animate={animate ? { rotate: [20, 15, 20] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Face */}
        <ellipse cx="0" cy="-6" rx="16" ry="14" fill="#EFEBE9" />

        {/* Spot on head */}
        <circle cx="-8" cy="-25" r="6" fill="#6D4C41" />

        {/* Eyes */}
        {expression === "sleepy" ? (
          <>
            <path d="M-9,-14 Q-6,-16 -3,-14" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M3,-14 Q6,-16 9,-14" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <circle cx="-7" cy="-14" r="3.5" fill="#3E2723" />
            <circle cx="7" cy="-14" r="3.5" fill="#3E2723" />
            <circle cx="-5.5" cy="-15.5" r="1.2" fill="white" />
            <circle cx="8.5" cy="-15.5" r="1.2" fill="white" />
          </>
        )}

        {/* Nose */}
        <ellipse cx="0" cy="-7" rx="4" ry="3" fill="#3E2723" />
        <ellipse cx="-1" cy="-8" rx="1.2" ry="0.8" fill="#5D4037" opacity="0.5" />

        {/* Mouth */}
        <path
          d={
            expression === "excited"
              ? "M-5,0 Q0,8 5,0"
              : "M-4,-1 Q0,5 4,-1"
          }
          stroke="#5D4037"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill={expression === "excited" ? "#FF8A80" : "none"}
        />

        {/* Tongue (excited) */}
        {expression === "excited" && (
          <motion.ellipse
            cx="0" cy="5"
            rx="3" ry="4"
            fill="#FF8A80"
            animate={{ scaleY: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}

        {/* Blush */}
        <circle cx="-14" cy="-5" r="3" fill="#FFAB91" opacity="0.4" />
        <circle cx="14" cy="-5" r="3" fill="#FFAB91" opacity="0.4" />

        {/* Paws */}
        <ellipse cx="-10" cy="40" rx="7" ry="4" fill="#8D6E63" />
        <ellipse cx="10" cy="40" rx="7" ry="4" fill="#8D6E63" />
        {/* Paw pads */}
        <circle cx="-10" cy="41" r="2" fill="#6D4C41" />
        <circle cx="10" cy="41" r="2" fill="#6D4C41" />
      </svg>
    </motion.div>
  );
}
