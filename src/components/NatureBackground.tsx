"use client";

import { motion } from "framer-motion";

interface NatureBackgroundProps {
  variant?: "default" | "night" | "spring";
}

export default function NatureBackground({ variant = "default" }: NatureBackgroundProps) {
  const bgGradient =
    variant === "night"
      ? "from-indigo-900 via-blue-800 to-indigo-700"
      : variant === "spring"
      ? "from-pink-100 via-rose-50 to-amber-50"
      : "from-amber-50 via-orange-50 to-yellow-50";

  return (
    <div className={`fixed inset-0 bg-gradient-to-b ${bgGradient} -z-10 overflow-hidden`}>
      {/* Clouds */}
      <motion.div
        className="absolute top-[5%] left-[10%]"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud size={80} opacity={0.6} />
      </motion.div>
      <motion.div
        className="absolute top-[8%] right-[15%]"
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud size={60} opacity={0.4} />
      </motion.div>
      <motion.div
        className="absolute top-[15%] left-[50%]"
        animate={{ x: [0, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud size={50} opacity={0.3} />
      </motion.div>

      {/* Sun / Moon */}
      {variant === "night" ? (
        <motion.div
          className="absolute top-[8%] right-[20%]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <svg width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="#FDD835" opacity="0.9" />
            <circle cx="18" cy="25" r="18" fill="#1A237E" opacity="0.8" />
          </svg>
        </motion.div>
      ) : (
        <motion.div
          className="absolute top-[6%] right-[12%]"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="15" fill="#FFB300" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="30"
                y1="30"
                x2={30 + Math.cos((angle * Math.PI) / 180) * 25}
                y2={30 + Math.sin((angle * Math.PI) / 180) * 25}
                stroke="#FFB300"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.6"
              />
            ))}
          </svg>
        </motion.div>
      )}

      {/* Hills */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "35%" }}
      >
        {/* Back hill */}
        <path
          d="M0,200 Q200,80 400,160 Q600,60 800,140 Q1000,60 1200,120 Q1400,80 1440,150 L1440,320 L0,320 Z"
          fill={variant === "night" ? "#1B5E20" : "#81C784"}
          opacity="0.5"
        />
        {/* Middle hill */}
        <path
          d="M0,240 Q300,120 500,200 Q700,100 900,180 Q1100,120 1300,170 Q1400,150 1440,200 L1440,320 L0,320 Z"
          fill={variant === "night" ? "#2E7D32" : "#66BB6A"}
          opacity="0.7"
        />
        {/* Front hill */}
        <path
          d="M0,260 Q200,200 400,240 Q600,180 800,230 Q1000,200 1200,250 Q1350,220 1440,260 L1440,320 L0,320 Z"
          fill={variant === "night" ? "#388E3C" : "#4CAF50"}
          opacity="0.9"
        />
      </svg>

      {/* Trees */}
      <div className="absolute bottom-[8%] left-[5%]">
        <Tree size={40} />
      </div>
      <div className="absolute bottom-[12%] left-[15%]">
        <Tree size={30} />
      </div>
      <div className="absolute bottom-[10%] right-[8%]">
        <Tree size={35} />
      </div>
      <div className="absolute bottom-[14%] right-[20%]">
        <Tree size={25} />
      </div>

      {/* Butterflies */}
      {variant !== "night" && (
        <>
          <motion.div
            className="absolute top-[30%] left-[20%]"
            animate={{
              x: [0, 60, 30, 80, 0],
              y: [0, -20, 10, -30, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <Butterfly />
          </motion.div>
          <motion.div
            className="absolute top-[40%] right-[25%]"
            animate={{
              x: [0, -40, -20, -60, 0],
              y: [0, 15, -10, 20, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          >
            <Butterfly color="#E91E63" />
          </motion.div>
        </>
      )}

      {/* Stars for night mode */}
      {variant === "night" &&
        Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full"
            style={{
              top: `${5 + Math.random() * 40}%`,
              left: `${5 + Math.random() * 90}%`,
            }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
    </div>
  );
}

function Cloud({ size = 60, opacity = 0.5 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 120 60" opacity={opacity}>
      <ellipse cx="60" cy="40" rx="50" ry="18" fill="white" />
      <ellipse cx="40" cy="30" rx="25" ry="20" fill="white" />
      <ellipse cx="75" cy="32" rx="22" ry="18" fill="white" />
      <ellipse cx="55" cy="25" rx="20" ry="16" fill="white" />
    </svg>
  );
}

function Tree({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60">
      <rect x="17" y="35" width="6" height="20" fill="#795548" rx="2" />
      <ellipse cx="20" cy="25" rx="15" ry="18" fill="#43A047" />
      <ellipse cx="14" cy="20" rx="10" ry="14" fill="#66BB6A" />
      <ellipse cx="26" cy="22" rx="10" ry="13" fill="#4CAF50" />
    </svg>
  );
}

function Butterfly({ color = "#FF9800" }: { color?: string }) {
  return (
    <motion.svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      animate={{ scaleX: [1, 0.3, 1] }}
      transition={{ duration: 0.4, repeat: Infinity }}
    >
      <ellipse cx="6" cy="6" rx="5" ry="5" fill={color} opacity="0.7" />
      <ellipse cx="14" cy="6" rx="5" ry="5" fill={color} opacity="0.7" />
      <ellipse cx="6" cy="12" rx="3" ry="3" fill={color} opacity="0.5" />
      <ellipse cx="14" cy="12" rx="3" ry="3" fill={color} opacity="0.5" />
      <line x1="10" y1="2" x2="10" y2="14" stroke="#5D4037" strokeWidth="1" />
    </motion.svg>
  );
}
