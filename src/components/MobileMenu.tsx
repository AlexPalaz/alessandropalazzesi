"use client";

import { useEffect, useId, useState } from "react";

type Props = {
  links: { href: string; label: string }[];
  openLabel: string;
  closeLabel: string;
};

/**
 * Phone navigation: a button in the header that opens a full-height panel with
 * the section links. Wider screens show the links inline and hide this.
 */
export function MobileMenu({ links, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // While the panel is open the page behind it must not scroll, and Escape closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
        className="relative flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink"
      >
        <span
          aria-hidden="true"
          className={`absolute h-[1.5px] w-4 bg-ink transition-transform duration-200 ${open ? "rotate-45" : "-translate-y-[3.5px]"}`}
        />
        <span
          aria-hidden="true"
          className={`absolute h-[1.5px] w-4 bg-ink transition-transform duration-200 ${open ? "-rotate-45" : "translate-y-[3.5px]"}`}
        />
      </button>
      {open && (
        <nav
          id={panelId}
          data-lenis-prevent
          className="absolute inset-x-0 top-full flex h-[calc(100dvh-4rem)] flex-col bg-paper px-5 pt-6 pb-10"
        >
          <ul className="flex flex-col border-t border-ink">
            {links.map((link, index) => (
              <li key={link.href} className="border-b border-rule">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-5 font-display text-[34px] leading-none font-semibold tracking-[-0.03em]"
                >
                  <span className="w-7 font-mono text-[13px] font-normal tracking-normal text-cobalt">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
