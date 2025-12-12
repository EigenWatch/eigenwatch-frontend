"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, WalletIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { title: "Dashboard", path: "/dashboard" },
  { title: "Token", path: "/#" },
  { title: "Operators", path: "/operator" },
  { title: "AVS", path: "/avs" },
  { title: "Apps", path: "/#" },
];

const menuVariants = {
  initial: {
    y: "-100%",
  },
  animate: {
    y: "0%",
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    y: "-100%",
    transition: {
      duration: 0.3,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090B]/80 backdrop-blur-md border-b border-white/5 pb-2">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => {
              const isActive = pathname.startsWith(link.path);
              return (
                <Link
                  key={index}
                  href={link.path}
                  className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-[#18181B] text-white border border-[#27272A]"
                      : "text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="w-full flex items-center gap-2 justify-center bg-[#155DFC] hover:bg-[#155DFC]/90 text-white px-5 py-3 rounded-xl text-base font-medium transition-colors mt-4">
              <WalletIcon />

              <span>Connect Wallet</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="md:hidden absolute inset-0 top-20 bg-[#09090B] w-full h-screen border-t border-white/5 flex flex-col p-4"
          >
            <div className="space-y-4">
              {navLinks.map((link, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link
                    href={link.path}
                    className="block text-[#A1A1AA] hover:text-white transition-colors py-2 text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants}>
                <button className="w-full flex items-center gap-2 justify-center bg-[#155DFC] hover:bg-[#155DFC]/90 text-white px-5 py-3 rounded-xl text-base font-medium transition-colors mt-4">
                  <WalletIcon />

                  <span>Connect Wallet</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
