'use client';
import { useEffect, useState } from 'react';
import SearchBox from '@/components/SearchBox';
import StatsCards from '@/components/StatsCards';
import AgentCard from '@/components/AgentCard';
import { apiFetch } from '@/lib/api';
import { Shield, Flag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [newAgents, setNewAgents] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [highlighted, setHighlighted] = useState([]);

  useEffect(() => {
    apiFetch('/agents?limit=6').then(setNewAgents).catch(() => {});
    apiFetch('/agents?featured=true&limit=4').then(setFeatured).catch(() => {});
    apiFetch('/agents?highlighted=true&limit=4').then(setHighlighted).catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Hero */}
      <section className="mb-14 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-50 dark:bg-primary-900/30 px-4 py-1.5 text-sm font-medium text-primary-700 dark:text-primary-300">
          <Shield className="h-4 w-4" />
          Kiểm tra trước khi giao dịch
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Tra cứu <span className="text-primary-600 dark:text-primary-400">Giao dịch viên</span>
          <br />uy tín & an toàn
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-slate-500 dark:text-slate-400">
          Nền tảng giúp bạn kiểm tra thông tin giao dịch viên trước khi thực hiện giao dịch.
          Dữ liệu được quản trị viên cập nhật và xác minh nhằm bảo vệ cộng đồng khỏi lừa đảo.
        </p>
        <div className="flex justify-center">
          <SearchBox large />
        </div>
      </section>

      {/* CTA Tố giác */}
      <section className="mb-14">
        <Link
          href="/report"
          className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 p-6 transition hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/50">
              <Flag className="h-6 w-6 text-rose-600" />
            </div>
            <div>
              <h2 className="font-semibold text-rose-800 dark:text-rose-200">Gặp lừa đảo? Hãy tố giác ngay</h2>
              <p className="text-sm text-rose-600/80 dark:text-rose-300/80">
                Gửi thông tin để bảo vệ người khác khỏi bị lừa
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-rose-700 dark:text-rose-300">
            Tố cáo ngay <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </section>

      {/* Stats */}
      <section className="mb-14">
        <StatsCards />
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-semibold">Giao dịch viên nổi bật</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((a: any) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>
        </section>
      )}

      {/* High rated */}
      {highlighted.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-semibold">Được đánh giá cao</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlighted.map((a: any) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>
        </section>
      )}

      {/* New */}
      {newAgents.length > 0 && (
        <section>
          <h2 className="mb-5 text-xl font-semibold">Giao dịch viên mới</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newAgents.map((a: any) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
