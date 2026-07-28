import { Shield, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Bên trái: Logo + Email liên hệ */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">baohiemluadao.vn</span>
            </div>
            <a
              href="mailto:baohiemluadao404050@gmail.com"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition"
            >
              <Mail className="h-4 w-4" />
              baohiemluadao404050@gmail.com
            </a>
          </div>

          {/* Giữa */}
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 max-w-md">
            Nền tảng tra cứu & tố giác lừa đảo. Dữ liệu do cộng đồng và quản trị viên cung cấp nhằm bảo vệ mọi người.
          </p>

          {/* Bên phải */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-500 justify-center md:justify-end">
            <Link href="/" className="hover:text-primary-600">Trang chủ</Link>
            <Link href="/search" className="hover:text-primary-600">Tra cứu</Link>
            <Link href="/report" className="hover:text-rose-600 font-medium">Tố giác scam</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
