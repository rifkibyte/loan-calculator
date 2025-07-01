"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define types for menu items
interface BaseMenuItem {
  href: string;
  label: string;
  isPlanned?: boolean;
}

interface LinkMenuItem {
  href: string;
  label: string;
  type: "link";
}

interface DropdownMenuItem {
  label: string;
  type: "dropdown";
  items: BaseMenuItem[];
}

type MenuItem = LinkMenuItem | DropdownMenuItem;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation menu items with dropdown support
  const menuItems: MenuItem[] = [
    {
      label: "Kredit Kendaraan",
      type: "dropdown",
      items: [
        { href: "/car-loan/complete", label: "Kredit Kendaraan Lengkap" },
        { href: "/car-loan/simple", label: "Kredit Kendaraan Sederhana" },
        { href: "/car-loan/budget", label: "Berdasarkan Budget Kendaraan" },
      ],
    },
    {
      label: "Kredit Properti",
      type: "dropdown",
      items: [
        { href: "/mortgage/complete", label: "KPR Lengkap" },
        { href: "/mortgage/house-price", label: "KPR Berdasar Harga Rumah" },
        { href: "/mortgage/income", label: "KPR Berdasar Penghasilan" },
        { href: "/mortgage/budget", label: "KPR Berdasar Budget" },
        { href: "/mortgage/fixed", label: "KPR Fixed Rate" },
        { href: "/mortgage/islamic-mortgage", label: "KPR Syariah" },
      ],
    },
    {
      label: "Kredit Personal",
      type: "dropdown",
      items: [
        { href: "/personal-loan/budget", label: "KTA Berdasar Budget" },
        { href: "/personal-loan/amount", label: "KTA Berdasar Pinjaman" },
      ],
    },
    {
      label: "Kredit Lainnya",
      type: "dropdown",
      items: [
        {
          href: "other-credit/multi-purpose-loan",
          label: "Kredit Multiguna",
        },
        { href: "other-credit/people-business-credit", label: "Kredit Usaha" },
      ],
    },
    {
      label: "Kalkulator Finansial",
      type: "dropdown",
      items: [
        {
          href: "/annuity-calculator",
          label: "Kalkulator Anuitas",
          isPlanned: true,
        },
        {
          href: "/credit-card-calculator",
          label: "Kalkulator Kartu Kredit",
          isPlanned: true,
        },
        {
          href: "/investment-calculator",
          label: "Kalkulator Investasi",
          isPlanned: true,
        },
        {
          href: "/savings-calculator",
          label: "Kalkulator Tabungan",
          isPlanned: true,
        },
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
  const isActiveDropdown = (items: BaseMenuItem[]) =>
    items.some((item) => pathname === item.href);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close mobile menu
  const closeMenu = () => setIsMenuOpen(false);

  // Handle planned feature click
  const handlePlannedClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    alert(`${label} sedang dalam pengembangan dan akan segera tersedia!`);
  };

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
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                KK
              </div>
              <span className="hidden sm:block">KalkulatorKredit</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <li key={index} className="relative group">
                  {item.type === "link" ? (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        isActiveLink(item.href)
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
                          isActiveDropdown(item.items)
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
                      <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-2">
                          {item.items.map((subItem, subIndex) => (
                            <div key={subIndex}>
                              {subItem.isPlanned ? (
                                <button
                                  onClick={(e) =>
                                    handlePlannedClick(e, subItem.label)
                                  }
                                  className="w-full text-left px-4 py-2 text-sm transition-colors text-gray-500 hover:text-gray-700 hover:bg-gray-50 flex items-center justify-between group/item"
                                >
                                  <span>{subItem.label}</span>
                                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity">
                                    Segera
                                  </span>
                                </button>
                              ) : (
                                <Link
                                  href={subItem.href}
                                  className={`block px-4 py-2 text-sm transition-colors ${
                                    isActiveLink(subItem.href)
                                      ? "text-blue-600 bg-blue-50"
                                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                  }`}
                                >
                                  {subItem.label}
                                </Link>
                              )}
                            </div>
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
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              {isMenuOpen ? (
                <>
                  <span className="block w-5 h-0.5 bg-current transform rotate-45 translate-y-0.5"></span>
                  <span className="block w-5 h-0.5 bg-current transform -rotate-45 -translate-y-0.5"></span>
                </>
              ) : (
                <>
                  <span className="block w-5 h-0.5 bg-current mb-1"></span>
                  <span className="block w-5 h-0.5 bg-current mb-1"></span>
                  <span className="block w-5 h-0.5 bg-current"></span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-screen pb-4" : "max-h-0"
          }`}
        >
          <nav className="border-t pt-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.type === "link" ? (
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-4 py-2 rounded-md font-medium transition-colors ${
                        isActiveLink(item.href)
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
                        {item.items.map((subItem, subIndex) => (
                          <div key={subIndex}>
                            {subItem.isPlanned ? (
                              <button
                                onClick={(e) =>
                                  handlePlannedClick(e, subItem.label)
                                }
                                className="w-full text-left px-4 py-2 text-sm transition-colors text-gray-500 hover:text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                              >
                                <span>{subItem.label}</span>
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                                  Segera
                                </span>
                              </button>
                            ) : (
                              <Link
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
                            )}
                          </div>
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
