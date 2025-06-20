"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation menu items with dropdown support
  const menuItems = [
    {
      href: "/",
      label: "Beranda",
      type: "link",
    },
    {
      label: "Kredit Kendaraan",
      type: "dropdown",
      items: [
        { href: "/car-loan/complete", label: "🚗 Kredit Kendaraan Lengkap" },
        { href: "/car-loan/simple", label: "🚙 Kredit Kendaraan Sederhana" },
        { href: "/car-loan/budget", label: "💰 Berdasarkan Budget Kendaraan" },
      ],
    },
    {
      label: "Kredit Properti & Lainnya",
      type: "dropdown",
      items: [
        { href: "/mortgage-calculator", label: "🏠 KPR (Kredit Rumah)" },
        { href: "/personal-loan", label: "💳 KTA (Kredit Tanpa Agunan)" },
        { href: "/multipurpose-loan", label: "🎯 Kredit Multiguna" },
        { href: "/business-loan", label: "🏢 Kredit Usaha" },
      ],
    },
    {
      label: "Kalkulator Finansial",
      type: "dropdown",
      items: [
        { href: "/annuity-calculator", label: "📊 Kalkulator Anuitas" },
        {
          href: "/credit-card-calculator",
          label: "💳 Kalkulator Kartu Kredit",
        },
        { href: "/investment-calculator", label: "📈 Kalkulator Investasi" },
        { href: "/savings-calculator", label: "💰 Kalkulator Tabungan" },
      ],
    },
    {
      href: "/about",
      label: "Tentang Kami",
      type: "link",
    },
  ];

  // Check if current path matches menu item
  const isActiveLink = (href: string) => pathname === href;

  // Check if any dropdown item is active
  const isActiveDropdown = (items: any[]) =>
    items.some((item) => pathname === item.href);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close mobile menu
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="hidden sm:block">SimulasiKredit</span>
              <span className="sm:hidden">SK</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <li key={index} className="relative group">
                  {item.type === "link" ? (
                    <Link
                      href={item.href!}
                      className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        isActiveLink(item.href!)
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-1 ${
                          isActiveDropdown(item.items!)
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                      >
                        {item.label}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-2">
                          {item.items!.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                isActiveLink(subItem.href)
                                  ? "text-blue-600 bg-blue-50"
                                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          <nav className="border-t pt-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.type === "link" ? (
                    <Link
                      href={item.href!}
                      onClick={closeMenu}
                      className={`block px-4 py-2 rounded-md font-medium transition-colors ${
                        isActiveLink(item.href!)
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div>
                      <div className="px-4 py-2 font-medium text-gray-900 border-b border-gray-200">
                        {item.label}
                      </div>
                      <div className="pl-4">
                        {item.items!.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            onClick={closeMenu}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              isActiveLink(subItem.href)
                                ? "text-blue-600 bg-blue-50"
                                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
