"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-4 md:mb-0">
          © {new Date().getFullYear()} Budgetify. Wszelkie prawa zastrzeżone.
        </p>
        <p>
          Created by{" "}
          <Link
            href="https://github.com/bednark"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            @bednark
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
