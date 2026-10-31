"use client";

import { useRef, useState } from "react";

export interface GalleryImage {
  src: string;
  alt: string;
  thumbAlt: string;
}

export default function Gallery({
  images,
  label,
  showViewLabel,
}: {
  images: GalleryImage[];
  label: string;
  /** Plantilla con {n}: "Mostrar vista {n}". */
  showViewLabel: string;
}) {
  const [active, setActive] = useState(0);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number, focus = false) {
    const next = (index + images.length) % images.length;
    setActive(next);
    if (focus) thumbs.current[next]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select(active + 1, true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select(active - 1, true);
    }
  }

  return (
    <div
      role="group"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-4 md:flex-row"
    >
      <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
        {images.map((img, i) => (
          <button
            key={i}
            ref={(el) => {
              thumbs.current[i] = el;
            }}
            type="button"
            aria-current={i === active ? "true" : undefined}
            aria-label={showViewLabel.replace("{n}", String(i + 1))}
            onClick={() => setActive(i)}
            className={`h-20 w-20 flex-none border bg-white p-1 transition-colors duration-150 md:h-24 md:w-24 ${
              i === active
                ? "border-ink"
                : "border-line hover:border-pill"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.thumbAlt}
              width={96}
              height={96}
              loading="lazy"
              className="aspect-square h-full w-full object-contain"
            />
          </button>
        ))}
      </div>

      <div className="order-1 flex-1 md:order-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active].src}
          alt={images[active].alt}
          width={800}
          height={800}
          className="aspect-square w-full bg-white object-contain"
        />
      </div>
    </div>
  );
}
