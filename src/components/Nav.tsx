"use client";

import React, { useEffect, useRef, useState } from "react";

export function Nav(): React.JSX.Element {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["formations", "team", "events"] as const;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target && (visible.target as HTMLElement).id) {
          setActive((visible.target as HTMLElement).id);
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-20% 0px -60% 0px",
      },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const linkClass = (id: string) => `site-nav-link ${active === id ? "is-active" : ""}`;

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      try {
        el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      } catch {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 96;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      if (history.replaceState) history.replaceState(null, "", `#${id}`);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && open) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const toggleOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setOpen((v) => !v);
  };

  useEffect(() => {
    const btn = toggleBtnRef.current;
    if (btn) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
  }, [open]);

  return (
    <nav
      className={`site-nav pointer-events-auto ${open ? "is-open" : ""} ${scrolled ? "is-scrolled" : ""}`}
      aria-label="Navigation principale"
    >
      <div className="site-nav-inner">
        <button
          type="button"
          className="site-nav-toggle"
          aria-label="Ouvrir le menu"
          aria-haspopup="true"
          aria-controls="site-nav-links"
          onClick={toggleOpen}
          ref={toggleBtnRef}
        >
          <span className="site-nav-toggle-bar" />
          <span className="site-nav-toggle-bar" />
          <span className="site-nav-toggle-bar" />
        </button>

        <div id="site-nav-links" className="site-nav-links" role="menu">
          <a
            href="#formations"
            className={linkClass("formations")}
            role="menuitem"
            onClick={(e) => {
              handleNav(e, "formations");
              setOpen(false);
            }}
          >
            Nos formations
          </a>
          <span className="site-nav-sep" aria-hidden="true">/</span>
          <a
            href="#team"
            className={linkClass("team")}
            role="menuitem"
            onClick={(e) => {
              handleNav(e, "team");
              setOpen(false);
            }}
          >
            La Team
          </a>
          <span className="site-nav-sep" aria-hidden="true">/</span>
          <a
            href="#events"
            className={linkClass("events")}
            role="menuitem"
            onClick={(e) => {
              handleNav(e, "events");
              setOpen(false);
            }}
          >
            Événements
          </a>
        </div>
      </div>
    </nav>
  );
}

