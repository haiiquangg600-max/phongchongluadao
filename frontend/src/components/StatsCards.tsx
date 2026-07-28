'use client';
import { useEffect, useState } from 'react';
import { Users, Search, Star, Flag } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalAgents: 0,
    totalSearches: 0,
    totalReviews: 0,
    totalReports: 0,
  });

  useEffect(() => {
    apiFetch('/stats')
      .then(setStats)
      .catch(() => {});
  }, []);

  const items = [
    { label: 'Giao dịch viên', value: stats.totalAgents, icon: Users, color: 'text-blue-500' },
    { label: 'Lượt tra cứu', value: stats.totalSearches, icon: Search, color: 'text-emerald-500' },
    { label: 'Đánh giá', value: stats.totalReviews, icon: Star, color: 'text-amber-500' },
    { label: 'Báo cáo', value: stats.totalReports, icon: Flag, color: 'text-rose-500' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight">
                  {item.value.toLocaleString('vi-VN')}
                </p>
              </div>
              <Icon className={`h-8 w-8 ${item.color} opacity-80`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
