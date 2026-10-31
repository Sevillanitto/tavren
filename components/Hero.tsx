"use client";

import { useEffect, useState } from "react";

interface Quote {
  text: string;
  author: string;
}

/**
 * La primera cita es fija en el render del servidor (evita errores de
 * hidratación); tras montar se elige una al azar.
 */
export default function Hero({
  quotes,
  tagline,
}: {
  quotes: Quote[];
  tagline: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * quotes.length));
  }, [quotes.length]);

  const quote = quotes[index];

  return (
    <section className="px-5 pb-16 pt-16 text-center md:px-8 md:pb-24 md:pt-24">
      <figure className="mx-auto max-w-4xl">
        <blockquote className="font-serif text-3xl font-medium leading-snug sm:text-4xl md:text-5xl md:leading-tight">
          <span aria-hidden="true">“</span>
          {quote.text}
          <span aria-hidden="true">”</span>
        </blockquote>
        <figcaption className="mt-6 text-base uppercase tracking-widest text-ink/75">
          — {quote.author}
        </figcaption>
      </figure>
      <p className="mx-auto mt-12 max-w-2xl text-lg leading-relaxed text-ink/85 md:text-xl">
        {tagline}
      </p>
    </section>
  );
}
