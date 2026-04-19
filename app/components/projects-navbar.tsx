"use client";

import { useEffect, useState, type MouseEvent } from "react";

type ProjectNavItem = {
  id: string;
  label: string;
  title?: string;
};

type ProjectsNavbarProps = {
  items: ProjectNavItem[];
  accentColor: string;
  defaultTitle?: string;
};

export function ProjectsNavbar({
  items,
  accentColor,
  defaultTitle = "Bizneslar uchun yechimlar",
}: ProjectsNavbarProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    setActiveId(id);
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    if (items.length === 0) return;

    const updateFromHash = () => {
      const hashId = window.location.hash.replace("#", "");
      if (hashId && items.some((item) => item.id === hashId)) {
        setActiveId(hashId);
      }
    };

    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio,
          )[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [items]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const currentItem = items.find((item) => item.id === activeId);
    document.title = currentItem?.title ?? currentItem?.label ?? defaultTitle;
  }, [activeId, defaultTitle, items]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <nav className="flex w-full flex-nowrap items-center gap-2 overflow-x-auto px-6 py-4 md:px-10">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => handleNavClick(event, item.id)}
              className="shrink-0 rounded-md border px-4 py-1.5 text-sm font-medium transition-colors"
              style={{
                borderColor: isActive ? accentColor : "var(--border)",
                backgroundColor: isActive ? accentColor : "transparent",
                color: isActive ? "#0b0b0b" : "var(--muted-foreground)",
                boxShadow: isActive ? "0 0 0 1px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
