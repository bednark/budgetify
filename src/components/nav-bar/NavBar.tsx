"use client";

import Link from "next/link";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const toggleNavbar = (): void => setNavbarOpen(!navbarOpen);
  const closeNavbar = (): void => setNavbarOpen(false);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-bold">
          Budgetify
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden md:flex space-x-8 text-lg items-center">
            <li>
              <Link href="/" className="hover:text-cyan-400 transition">
                Strona główna
              </Link>
            </li>
            <li>
              <Link href="/wydatki" className="hover:text-cyan-400 transition">
                Wydatki
              </Link>
            </li>

            {status === "loading" ? (
              <li className="text-sm text-gray-400 italic">
                Ładowanie...
              </li>
            ) : session ? (
              <>
                <li className="text-sm text-gray-300">
                  Zalogowano jako <span className="font-semibold">{session.user?.name || session.user?.email}</span>
                </li>
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 text-sm"
                  >
                    Wyloguj się
                  </button>
                </li>
              </>
            ) : (
              <li className="text-sm text-gray-400 italic">
                Jesteś offline.
              </li>
            )}
          </ul>

          <div className="md:hidden mt-2">
            <button onClick={toggleNavbar} aria-label="Toggle menu" className="text-2xl">
              {navbarOpen ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {navbarOpen && (
        <div className="md:hidden bg-gray-800 w-full h-screen flex flex-col
          items-center justify-center space-y-8 text-xl pb-36"
        >
          <Link href="/" onClick={closeNavbar} className="hover:text-cyan-400">
            Strona główna
          </Link>
          <Link href="/wydatki" onClick={closeNavbar} className="hover:text-cyan-400">
            Wydatki
          </Link>

          {status === "loading" ? (
            <div className="text-gray-400 text-sm italic">Ładowanie...</div>
          ) : session ? (
            <>
              <div className="text-center text-gray-300 text-sm">
                Zalogowano jako <span className="font-semibold">{session.user?.name || session.user?.email}</span>
              </div>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  closeNavbar();
                }}
                className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 text-sm"
              >
                Wyloguj się
              </button>
            </>
          ) : (
            <div className="text-gray-400 text-sm italic">
              Jesteś offline.
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
