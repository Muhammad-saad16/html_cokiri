"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

/**
 * Full-bleed photographic hero with a "this week" timetable panel
 * and a scrolling ticker of current programs underneath.
 */
export default function Hero({ imageUrl, schedule = [], ticker = [] }) {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-black/30" />
      <div className="kufic absolute inset-0 -z-10 opacity-60" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-20 sm:px-6 lg:min-h-[calc(100vh-9.25rem)] lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:px-8 lg:py-24">
        <div>
          <motion.h1 {...rise(0)} className="font-display text-[3.4rem] leading-[0.92] font-extrabold tracking-tight text-white sm:text-7xl lg:text-[6.5rem]">
            City of
            <br />
            Knowledge
          </motion.h1>
          <motion.p {...rise(0.1)} className="mt-6 flex items-center gap-3 font-display text-base font-semibold tracking-[0.12em] text-gold uppercase sm:text-xl">
            <span className="hidden h-px w-10 bg-gold sm:block" /> Islamic Research Institute · Karachi
          </motion.p>
          <motion.p {...rise(0.3)} className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            A hub for encyclopaedic knowledge and multidisciplinary research — imparting Knowledge and Tarbiyyah to men, women
            and children, under the supervision of <span className="font-semibold text-white">Dr. Umair Mahmood Siddiqui</span>.
          </motion.p>
          <motion.div {...rise(0.4)} className="mt-9 flex flex-wrap gap-3">
            <Link href="/programs" className="btn-red group">
              Explore programs <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/about" className="btn-line-light">
              About the institute
            </Link>
          </motion.div>
        </div>

        {schedule.length > 0 && (
          <motion.aside {...rise(0.5)} className="border border-line bg-coal-3 shadow-[12px_12px_0_0_var(--color-gold)]">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <p className="label text-gold">This week at CoK</p>
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" aria-hidden />
            </div>
            <ul>
              {schedule.map((s) => (
                <li key={s.href} className="border-b border-line last:border-0">
                  <Link href={s.href} className="group grid grid-cols-[4.5rem_1fr] items-center gap-4 px-6 py-4 transition hover:bg-coal-2">
                    <span className="bg-gold py-2 text-center font-display text-sm leading-tight font-bold text-black uppercase">
                      {s.day}
                    </span>
                    <span>
                      <span className="block font-display text-lg leading-tight font-bold text-ivory group-hover:text-gold">{s.title}</span>
                      <span className="mt-0.5 block text-xs text-muted">{s.time}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-2 bg-coal-2 px-6 py-3 text-xs text-muted">
              <MapPin size={13} className="text-gold" /> B-105, 13-D/1, Gulshan-e-Iqbal, Karachi
            </p>
          </motion.aside>
        )}
      </div>

      {ticker.length > 0 && (
        <div className="overflow-hidden bg-gold py-3 text-black">
          <div className="flex w-max animate-ticker gap-10 whitespace-nowrap">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="flex items-center gap-10 text-sm font-semibold" aria-hidden={i >= ticker.length}>
                {t}
                <span className="text-black/40">✦</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
