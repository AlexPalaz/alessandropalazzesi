"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// Dark is the default: anything other than an explicit "light" counts as dark.
const readTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function ThemeToggle({ toDark, toLight }: { toDark: string; toLight: string }) {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "dark");

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode: the choice simply lasts for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? toLight : toDark}
      className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink transition-colors hover:border-cobalt"
    >
      <span
        aria-hidden="true"
        className="size-4 rounded-full border-[1.5px] border-ink bg-[linear-gradient(90deg,var(--ink)_50%,transparent_50%)]"
      />
    </button>
  );
}
