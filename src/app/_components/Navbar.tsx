"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { NavLink } from "~/constants";
import { NAV_LINKS } from "~/constants";

const Dropdown: React.FC<{
  link: NavLink;
  active: boolean;
  onToggle: () => void;
  onClose: () => void;
}> = ({ link, active, onToggle, onClose }) => (
  <li className="relative">
    <button
      onClick={onToggle}
      className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition-colors"
    >
      {link.label}
      <svg
        className={`w-3 h-3 transition-transform ${active ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {active && link.subLinks && (
      <ul className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md z-50 border">
        {link.subLinks.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              onClick={onClose}
              className="block px-4 py-2 hover:bg-orange-500 hover:text-white"
            >
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </li>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <nav
        ref={navRef}
        className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-6 py-4"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={80} height={30} />
          {/* <span className="font-semibold text-lg text-gray-900">MentorGuru</span> */}
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-8 items-center">
          {NAV_LINKS.map((link) =>
            link.subLinks ? (
              <Dropdown
                key={link.key}
                link={link}
                active={activeDropdown === link.key}
                onToggle={() =>
                  setActiveDropdown(
                    activeDropdown === link.key ? null : link.key
                  )
                }
                onClose={() => setActiveDropdown(null)}
              />
            ) : (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-orange-500 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex">
          <Link
            href="/login"
            className="px-5 py-2 rounded-md bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden"
        >
          <Image
            src={mobileOpen ? "/close.svg" : "/menu.svg"}
            alt="menu"
            width={28}
            height={28}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md p-4 mt-2 z-40">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.subLinks && (
                  <ul className="ml-4 mt-1 flex flex-col gap-1">
                    {link.subLinks.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className="block px-3 py-1 text-sm text-gray-600 hover:text-orange-500"
                          onClick={() => setMobileOpen(false)}
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <Link
            href="/login"
            className="mt-3 block text-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            onClick={() => setMobileOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
