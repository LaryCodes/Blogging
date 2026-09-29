"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon, CloseIcon } from "@/components/Icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Articles" },
  { href: "/services", label: "Services" },
  { href: "/authors", label: "Authors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Site header with responsive navigation and active-link highlighting. */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/95 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
            B
          </span>
          <span className="text-lg font-bold tracking-tight text-ink-900">BLOGGING</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-brand-700"
                    : "text-ink-600 hover:text-ink-900"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 md:inline-block"
        >
          Talk to Us
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-ink-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-ink-200 bg-white md:hidden">
          <ul className="container-page flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2.5 text-base font-medium ${
                    isActive(link.href)
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink-700 hover:bg-ink-50"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="px-3 py-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Talk to Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
