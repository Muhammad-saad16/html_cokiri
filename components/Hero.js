"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MapPin, CalendarClock } from "lucide-react";
import { Ornament, ArchEdge } from "./Ornaments";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ description, imageUrl, highlight }) {
  return (
    <section className="pattern-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/70 via-transparent to-maroon-dark/30" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-14 pb-28 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-20 lg:pb-36">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
          <motion.p variants={item} className="text-gold-gradient font-arabic text-5xl leading-[1.5] font-bold sm:text-6xl" lang="ar" dir="rtl">
            مَدِينَةُ العِلْم
          </motion.p>
          <motion.div variants={item}>
            <Ornament className="mt-1 lg:!justify-start" light />
          </motion.div>
          <motion.h1 variants={item} className="mt-5 font-serif text-5xl leading-[1.05] font-semibold text-ivory sm:text-6xl lg:text-7xl">
            City of Knowledge
          </motion.h1>
          <motion.p variants={item} className="mt-3 text-sm font-semibold tracking-[0.35em] text-gold-light uppercase">
            Islamic Research Institute
          </motion.p>
          <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ivory/75 lg:mx-0">
            {description ||
              "A dynamic hub for encyclopaedic knowledge and multidisciplinary research — imparting Knowledge and Tarbiyyah to prepare minds to serve Islam with dedication."}
          </motion.p>
          <motion.p variants={item} className="mt-4 text-sm text-ivory/60">
            A project of ITQAN Educational &amp; Research Foundation · under the supervision of{" "}
            <span className="font-semibold text-gold-light">Dr. Umair Mahmood Siddiqui</span>
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link href="/programs" className="btn-gold group">
              Explore Programs <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/about" className="btn-outline-light">
              Vision &amp; Mission
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="arch absolute -inset-3 border-2 border-gold/50" aria-hidden />
          <div className="arch relative aspect-[4/5] overflow-hidden border-4 border-gold shadow-2xl shadow-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="City of Knowledge Islamic Research Institute building" className="h-full w-full object-cover object-[60%_center]" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-navy-deep/90 to-transparent p-5 pt-12 text-sm text-ivory">
              <MapPin size={15} className="text-gold" /> B-105, 13-D/1, Gulshan-e-Iqbal, Karachi
            </div>
          </div>

          {highlight && (
            <Link
              href={highlight.href}
              className="absolute -bottom-10 left-1/2 flex w-[92%] -translate-x-1/2 items-center gap-4 rounded-2xl border border-gold/50 bg-ivory p-4 shadow-2xl transition hover:-translate-y-1 sm:-left-10 sm:w-80 sm:translate-x-0"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-maroon text-gold-light">
                <CalendarClock size={22} />
              </span>
              <span className="text-left">
                <span className="block text-[10px] font-bold tracking-[0.2em] text-maroon uppercase">Every week</span>
                <span className="block font-serif text-lg leading-tight font-semibold text-navy">{highlight.title}</span>
                <span className="block text-xs text-muted">{highlight.schedule}</span>
              </span>
            </Link>
          )}
        </motion.div>
      </div>
      <ArchEdge className="absolute inset-x-0 -bottom-px" />
    </section>
  );
}
