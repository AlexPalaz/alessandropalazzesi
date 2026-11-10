"use client";

import { useEffect, useRef, useState } from "react";

type Labels = { copy: string; copied: string; copyLabel: string };

/** Copies text to the clipboard, falling back to a hidden textarea where the Clipboard API is missing. */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const done = document.execCommand("copy");
    area.remove();
    return done;
  }
}

/**
 * The email address with a copy button. A mailto link depends on the visitor
 * having a mail app set up; copying always works.
 */
export function CopyEmail({ email, labels }: { email: string; labels: Labels }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    if (!(await copyText(email))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="font-mono text-[15px] break-all text-body select-all md:text-base">{email}</span>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? labels.copied : labels.copyLabel}
        className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-ink px-4 text-sm font-semibold transition-colors hover:border-cobalt hover:text-cobalt"
      >
        {copied ? (
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 8.5l3 3 7-7" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" />
          </svg>
        )}
        <span aria-live="polite">{copied ? labels.copied : labels.copy}</span>
      </button>
    </div>
  );
}
