"use client";

import { useState } from "react";
import type { BookFormat } from "@/data/books";

export default function BuyBox({
  formats,
  labels,
  urls,
  fallbackUrl,
  formatLabel,
  buyLabel,
  comingSoonLabel,
}: {
  formats: BookFormat[];
  labels: Record<BookFormat, string>;
  urls?: Partial<Record<BookFormat, string>>;
  fallbackUrl: string;
  formatLabel: string;
  buyLabel: string;
  comingSoonLabel: string;
}) {
  const [format, setFormat] = useState<BookFormat>(
    formats.includes("paperback") ? "paperback" : formats[0],
  );
  const href = urls?.[format] ?? fallbackUrl;
  // Sin enlace o "#": botón desactivado, sin enlace ni navegación.
  const disabled = !href || href === "#";

  return (
    <div>
      {formats.length > 1 && (
      <div
        role="group"
        aria-label={formatLabel}
        className="flex flex-wrap gap-x-5 gap-y-2"
      >
        {formats.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={f === format}
            onClick={() => setFormat(f)}
            className={`text-xs uppercase tracking-[0.14em] ${
              f === format
                ? "text-ink underline decoration-1 underline-offset-[6px]"
                : "text-ink/60 hover:text-ink"
            }`}
          >
            {labels[f]}
          </button>
        ))}
      </div>
      )}

      {disabled ? (
        <span
          role="link"
          aria-disabled="true"
          className={`${formats.length > 1 ? "mt-6" : ""} flex h-12 cursor-default items-center justify-center border border-[#D9E3EA] bg-transparent px-6 text-xs font-medium uppercase tracking-[0.2em] text-ink/40`}
        >
          {comingSoonLabel}
        </span>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${formats.length > 1 ? "mt-6" : ""} flex h-12 items-center justify-center bg-ink px-6 text-xs font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90`}
        >
          {buyLabel}
        </a>
      )}
    </div>
  );
}
