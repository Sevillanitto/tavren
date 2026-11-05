"use client";

import { useEffect, useRef, useState } from "react";

export interface GalleryImage {
  src: string;
  alt: string;
}

export default function Gallery({
  images,
  label,
}: {
  images: GalleryImage[];
  label: string;
}) {
  const [active, setActive] = useState(0);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const strip = useRef<HTMLDivElement | null>(null);

  // Mantiene la miniatura activa a la vista dentro de la tira (vertical en
  // escritorio, horizontal en móvil) sin mover la página.
  useEffect(() => {
    const c = strip.current;
    const b = thumbs.current[active];
    if (!c || !b) return;
    const cr = c.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    if (br.top < cr.top) c.scrollTop += br.top - cr.top;
    else if (br.bottom > cr.bottom) c.scrollTop += br.bottom - cr.bottom;
    if (br.left < cr.left) c.scrollLeft += br.left - cr.left;
    else if (br.right > cr.right) c.scrollLeft += br.right - cr.right;
  }, [active]);

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
      className="relative flex flex-col gap-6 md:block"
    >
      {images.length > 1 && (
      <div
        ref={strip}
        className="no-scrollbar order-2 flex items-start gap-[15px] overflow-x-auto md:absolute md:inset-y-0 md:left-0 md:w-[68px] md:flex-col md:overflow-y-auto md:overflow-x-hidden"
      >
        {images.map((img, i) => (
          <button
            key={i}
            ref={(el) => {
              thumbs.current[i] = el;
            }}
            type="button"
            aria-current={i === active ? "true" : undefined}
            aria-label={`${i + 1}/${images.length}`}
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
              alt={img.alt}
              width={68}
              height={68}
              loading="lazy"
              className="h-auto w-full object-contain mix-blend-multiply"
            />
          </button>
        ))}
      </div>
      )}

      <div
        className={`order-1 flex items-start justify-center px-2 md:px-6 ${
          images.length > 1 ? "md:ml-[84px]" : ""
        }`}
      >
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
