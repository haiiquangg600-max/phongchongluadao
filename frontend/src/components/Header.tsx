'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Shield, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-primary-600 dark:text-primary-400">
          <Shield className="h-7 w-7" />
          <span className="text-lg tracking-tight">Bảo Hiểm Lừa Đảo</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium hover:text-primary-600 transition">
            Trang chủ
          </Link>
          <Link href="/search" className="text-sm font-medium hover:text-primary-600 transition">
            Tra cứu
          </Link>
          <Link href="/report" className="text-sm font-medium text-rose-600 hover:text-rose-700 transition">
            Tố giác scam
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
