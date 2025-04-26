"use client";

import Link from "next/link";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useState } from "react";

const NavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

  const toggleNavbar = (): void => setNavbarOpen(!navbarOpen);
  const closeNavbar = (): void => setNavbarOpen(false);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-bold">
          Budgetify
        </Link>

        <div className="md:hidden mt-2">
          <button onClick={toggleNavbar} aria-label="Toggle menu" className="text-2xl">
            {navbarOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>

        <ul className="hidden md:flex space-x-8 text-lg">
          <li>
            <Link href="/" className="hover:text-cyan-400 transition">
              Strona główna
            </Link>
          </li>
          {/* <li>
            <Link href="/wydatki" className="hover:text-cyan-400 transition">
              Wydatki
            </Link>
          </li> */}
        </ul>
      </div>

      {navbarOpen && (
        <div className="md:hidden bg-gray-800 w-full h-screen flex flex-col
          items-center justify-center space-y-8 text-xl pb-36"
        >
          <Link href="/" onClick={closeNavbar} className="hover:text-cyan-400">
            Strona główna
          </Link>
          {/* <Link href="/wydatki" onClick={closeNavbar} className="hover:text-cyan-400">
            Wydatki
          </Link> */}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
