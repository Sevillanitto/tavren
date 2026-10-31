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
      className="flex flex-col gap-6 md:flex-row md:gap-4"
    >
      <div className="order-2 flex items-start gap-[15px] overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
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
            className={`w-[68px] flex-none rounded-sm border p-0.5 ${
              i === active
                ? "border-ink"
                : "border-transparent opacity-75 hover:opacity-100"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.thumbAlt}
              width={68}
              height={68}
              loading="lazy"
              className="h-auto w-full object-contain mix-blend-multiply"
            />
          </button>
        ))}
      </div>

      <div className="order-1 flex flex-1 items-start justify-center px-2 md:order-2 md:px-6">
        {/* key: reinicia el fundido de 150 ms al cambiar de foto */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={images[active].src + active}
          src={images[active].src}
          alt={images[active].alt}
          width={800}
          height={800}
          className="gallery-fade h-auto max-h-[640px] w-auto max-w-full object-contain mix-blend-multiply"
        />
      </div>
    </div>
  );
}
