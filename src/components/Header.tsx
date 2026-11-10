import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const other: Locale = lang === "en" ? "it" : "en";
  const links = [
    { href: "#services", label: dict.nav.services },
    { href: "#clients", label: dict.nav.clients },
    { href: "#lab", label: dict.nav.lab },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-paper/75 backdrop-blur-md">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        {dict.nav.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-[88px] md:px-16">
        <a
          href="#top"
          aria-label="Alessandro Palazzesi"
          className="py-2 font-display text-[22px] font-bold tracking-[-0.02em] md:text-[24px]"
        >
          {/* The full name where there is room, the initials on a phone. */}
          <span className="lg:hidden">AP</span>
          <span className="hidden lg:inline">Alessandro Palazzesi</span>
          <span className="text-cobalt">.</span>
        </a>
        <nav className="flex items-center gap-3 font-mono text-[13px] md:gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden py-3.5 transition-colors hover:text-cobalt md:block"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={`/${other}`}
            hrefLang={other}
            aria-label={dict.nav.otherLangLabel}
            className="flex h-11 items-center px-1 text-muted transition-colors hover:text-cobalt"
          >
            {dict.nav.otherLang}
          </Link>
          <ThemeToggle toDark={dict.nav.themeToDark} toLight={dict.nav.themeToLight} />
          <MobileMenu links={links} openLabel={dict.nav.menuOpen} closeLabel={dict.nav.menuClose} />
        </nav>
      </div>
    </header>
  );
}
