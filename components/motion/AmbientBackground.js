"use client";

import { motion } from "motion/react";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <motion.div
        className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-orange-200/40 blur-3xl"
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -left-32 w-[24rem] h-[24rem] rounded-full bg-slate-300/40 blur-3xl"
        animate={{ x: [0, 25, 0], y: [0, -25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true">
        <defs>
          <pattern id="grid8" width="64" height="64" patternUnits="userSpaceOnUse">
            <path
              d="M32 4 L60 32 L32 60 L4 32 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-orange-900"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid8)" />
      </svg>
    </div>
  );
}
