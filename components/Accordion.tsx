"use client";

import { useId, useState } from "react";

export default function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <section className="border-b border-line">
      <h2>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between py-5 text-left text-sm font-medium uppercase tracking-[0.2em]"
        >
          {title}
          <span aria-hidden="true" className="text-xl font-light leading-none">
            {open ? "−" : "+"}
          </span>
        </button>
      </h2>
      <div id={id} role="region" aria-label={title} hidden={!open} className="pb-8">
        {children}
      </div>
    </section>
  );
}
