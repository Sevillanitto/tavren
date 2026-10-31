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
  noteLabel,
}: {
  formats: BookFormat[];
  labels: Record<BookFormat, string>;
  urls?: Partial<Record<BookFormat, string>>;
  fallbackUrl: string;
  formatLabel: string;
  buyLabel: string;
  noteLabel: string;
}) {
  const [format, setFormat] = useState<BookFormat>(
    formats.includes("paperback") ? "paperback" : formats[0],
  );
  const href = urls?.[format] ?? fallbackUrl;

  return (
    <div>
      <div
        role="group"
        aria-label={formatLabel}
        className="flex flex-wrap gap-2"
      >
        {formats.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={f === format}
            onClick={() => setFormat(f)}
            className={`rounded-sm border px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-150 ${
              f === format
                ? "border-ink text-ink"
                : "border-pill text-ink/75 hover:border-ink/50"
            }`}
          >
            {labels[f]}
          </button>
        ))}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block bg-ink px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
      >
        {buyLabel}
      </a>
      <p className="mt-2 text-center text-xs text-ink/70">{noteLabel}</p>
    </div>
  );
}
