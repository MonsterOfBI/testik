"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

export function Disclosure({ title, children, defaultOpen = false, className = "" }: { title: ReactNode; children: ReactNode; defaultOpen?: boolean; className?: string }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`border-t border-line ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium"
      >
        <span>{title}</span>
        <motion.svg animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-muted">
          <path d="M12 5v14M5 12h14" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Md({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`prose-t text-[15px] leading-relaxed text-ink-2 ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
