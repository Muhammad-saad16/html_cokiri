"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";

export default function Counter({ value, suffix = "", className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 90 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  const displayRef = useRef(null);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = Math.round(latest) + suffix;
      }
    });
  }, [springValue, suffix]);

  return (
    <motion.span ref={ref} className={className}>
      <span ref={displayRef}>0{suffix}</span>
    </motion.span>
  );
}
