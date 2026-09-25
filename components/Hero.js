"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import AmbientBackground from "./motion/AmbientBackground";
import FitImage from "@/components/FitImage";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ description, imageUrl }) {
  return (
    <section className="relative overflow-hidden">
      <AmbientBackground />
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item}>
            <span className="inline-block rounded-md bg-orange-600 text-white text-sm font-medium px-3 py-1">
              Islamic Research Institute
            </span>
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-5 text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-slate-900 leading-[0.95]"
          >
            City of Knowledge
          </motion.h1>
          <motion.p variants={item} className="mt-4 text-sm text-slate-500">
            A Project of ITQAN Educational & Research Foundation · Under the supervision of{" "}
            <span className="font-semibold text-slate-800">Dr. Umair Mahmood Siddiqui</span>
          </motion.p>
          <motion.p variants={item} className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
            {description ||
              "A dynamic hub for encyclopaedic knowledge and multidisciplinary research — imparting Knowledge and Tarbiyyah to prepare minds to serve Islam with dedication."}
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/programs"
              className="group inline-flex items-center gap-2 rounded-full bg-orange-600 text-white text-sm font-medium px-6 py-3.5 hover:bg-orange-700 transition shadow-lg shadow-orange-600/20"
            >
              Explore Programs
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-300 text-slate-700 text-sm font-medium px-6 py-3.5 hover:bg-white hover:border-slate-400 transition"
            >
              Vision & Mission
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-orange-200/60 via-slate-100/30 to-transparent blur-2xl" />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 ring-8 ring-white">
            {imageUrl ? (
              <FitImage src={imageUrl} alt="City of Knowledge Islamic Research Institute building" className="w-full h-72 md:h-96" />
            ) : (
              <div className="w-full h-72 md:h-96 bg-gradient-to-br from-slate-900 to-orange-950" />
            )}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white text-sm flex items-center gap-2">
              <MapPin size={15} className="text-orange-400" /> B-105, 13-D/1, Gulshan-e-Iqbal, Karachi
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
