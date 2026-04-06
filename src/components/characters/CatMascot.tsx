"use client";

import { motion } from "framer-motion";

interface CatMascotProps {
  size?: number;
  className?: string;
  animate?: boolean;
  expression?: "happy" | "excited" | "sleepy";
}

export default function CatMascot({
  size = 120,
  className = "",
  animate = true,
  expression = "happy",
}: CatMascotProps) {
  const eyeShape = expression === "sleepy" ? "M-3,0 Q0,-2 3,0" : undefined;
  const mouthD =
    expression === "excited"
      ? "M-5,2 Q0,8 5,2"
      : expression === "sleepy"
      ? "M-3,1 Q0,3 3,1"
      : "M-4,2 Q0,6 4,2";

  return (
    <motion.div
      className={className}
      animate={animate ? { y: [0, -6, 0] } : {}}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="-50 -50 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body */}
        <ellipse cx="0" cy="20" rx="22" ry="25" fill="#FFB74D" />
        <ellipse cx="0" cy="22" rx="16" ry="18" fill="#FFF3E0" />

        {/* Tail */}
        <motion.path
          d="M18,30 Q35,20 30,5 Q28,0 25,5"
          stroke="#FFB74D"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          animate={animate ? { d: [
            "M18,30 Q35,20 30,5 Q28,0 25,5",
            "M18,30 Q38,25 32,8 Q30,3 27,8",
            "M18,30 Q35,20 30,5 Q28,0 25,5",
          ] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Head */}
        <circle cx="0" cy="-12" r="22" fill="#FFB74D" />

        {/* Ears */}
        <polygon points="-20,-28 -14,-45 -4,-26" fill="#FFB74D" />
        <polygon points="-17,-30 -14,-41 -7,-28" fill="#FFCC80" />
        <polygon points="20,-28 14,-45 4,-26" fill="#FFB74D" />
        <polygon points="17,-30 14,-41 7,-28" fill="#FFCC80" />

        {/* Face */}
        <ellipse cx="0" cy="-8" rx="16" ry="14" fill="#FFF3E0" />

        {/* Eyes */}
        {expression === "sleepy" ? (
          <>
            <path d="M-9,-14 Q-6,-16 -3,-14" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M3,-14 Q6,-16 9,-14" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <circle cx="-7" cy="-14" r="3.5" fill="#5D4037" />
            <circle cx="7" cy="-14" r="3.5" fill="#5D4037" />
            {/* Eye highlights */}
            <circle cx="-5.5" cy="-15.5" r="1.2" fill="white" />
            <circle cx="8.5" cy="-15.5" r="1.2" fill="white" />
          </>
        )}

        {/* Nose */}
        <ellipse cx="0" cy="-8" rx="2.5" ry="2" fill="#FF8A65" />

        {/* Mouth */}
        <path d={mouthD} stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" fill="none" transform="translate(0,-4)" />

        {/* Whiskers */}
        <line x1="-18" y1="-10" x2="-30" y2="-14" stroke="#BCAAA4" strokeWidth="1" />
        <line x1="-18" y1="-7" x2="-30" y2="-7" stroke="#BCAAA4" strokeWidth="1" />
        <line x1="18" y1="-10" x2="30" y2="-14" stroke="#BCAAA4" strokeWidth="1" />
        <line x1="18" y1="-7" x2="30" y2="-7" stroke="#BCAAA4" strokeWidth="1" />

        {/* Blush */}
        <circle cx="-14" cy="-6" r="3" fill="#FFAB91" opacity="0.5" />
        <circle cx="14" cy="-6" r="3" fill="#FFAB91" opacity="0.5" />

        {/* Paws */}
        <ellipse cx="-10" cy="40" rx="7" ry="4" fill="#FFB74D" />
        <ellipse cx="10" cy="40" rx="7" ry="4" fill="#FFB74D" />
      </svg>
    </motion.div>
  );
}
