"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const links = [{ href: "/", label: "Home" }, { href: "/products", label: "Products" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.jpg" alt="Ecomotiq" width={140} height={40} className="h-8 w-auto" unoptimized />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={`text-sm font-medium transition ${pathname === link.href ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}>
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-500 transition">
              Get Quote
            </Link>
          </nav>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`block py-2 text-sm font-medium ${pathname === link.href ? "text-indigo-600" : "text-gray-600"}`}>{link.label}</Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
