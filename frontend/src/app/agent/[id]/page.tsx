'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiFetch, formatMoney, formatDate } from '@/lib/api';
import {
  ShieldCheck, ShieldAlert, Star, Phone, CreditCard, Facebook,
  Calendar, Banknote, MessageSquare, History, Flag,
} from 'lucide-react';
import Link from 'next/link';

export default function AgentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiFetch(`/agents/${id}`)
      .then(setAgent)
      .catch(() => setAgent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="h-64 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="text-lg font-medium">Không tìm thấy giao dịch viên</p>
        <Link href="/" className="mt-4 inline-block text-primary-600 hover:underline">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Header card */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 text-3xl font-bold">
            {agent.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{agent.name}</h1>
              {agent.verification === 'VERIFIED' ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  <ShieldCheck className="h-3.5 w-3.5" /> Đã xác minh
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/40 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                  <ShieldAlert className="h-3.5 w-3.5" /> Chưa xác minh
                </span>
              )}
            </div>

            <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              {agent.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  {agent.phone}
                </div>
              )}
              {agent.accountNumber && (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-slate-400" />
                  {agent.accountNumber} ({agent.bankName})
                </div>
              )}
              {agent.facebookLink && (
                <div className="flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-slate-400" />
                  <a href={agent.facebookLink} target="_blank" rel="noopener" className="text-primary-600 hover:underline truncate">
                    Facebook
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                Tham gia: {formatDate(agent.joinDate)}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-1.5 text-amber-500 font-semibold">
                <Star className="h-5 w-5 fill-current" />
                {agent.trustScore.toFixed(1)} / 5
                <span className="text-xs font-normal text-slate-500 ml-1">
                  ({agent.trustSource === 'admin_set' ? 'do admin thiết lập' : 'từ đánh giá người dùng'})
                </span>
              </div>
              {agent.depositAmount > 0 && (
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <Banknote className="h-5 w-5" />
                  Cọc: {formatMoney(agent.depositAmount)}
                </div>
              )}
              <Link
                href={`/report?name=${encodeURIComponent(agent.name)}&phone=${encodeURIComponent(agent.phone || '')}`}
                className="ml-auto flex items-center gap-1.5 rounded-lg border border-rose-200 dark:border-rose-800 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition"
              >
                <Flag className="h-4 w-4" />
                Tố giác
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <History className="h-5 w-5" /> Lịch sử giao dịch
        </h2>
        {agent.transactions?.length > 0 ? (
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Ngày</th>
                  <th className="px-4 py-3 text-left font-medium">Số tiền</th>
                  <th className="px-4 py-3 text-left font-medium">Mô tả</th>
                </tr>
              </thead>
              <tbody>
                {agent.transactions.map((t: any) => (
                  <tr key={t.id} className="border-t border-[var(--border)]">
                    <td className="px-4 py-3">{formatDate(t.date)}</td>
                    <td className="px-4 py-3 font-medium text-emerald-600">{formatMoney(t.amount)}</td>
                    <td className="px-4 py-3 text-slate-500">{t.description || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">Chưa có lịch sử giao dịch được ghi nhận.</p>
        )}
      </section>

      {/* Reviews */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <MessageSquare className="h-5 w-5" /> Đánh giá người dùng
        </h2>
        {agent.reviews?.length > 0 ? (
          <div className="space-y-3">
            {agent.reviews.map((r: any) => (
              <div key={r.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-amber-500">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{formatDate(r.createdAt)}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{r.comment || 'Không có bình luận'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">Chưa có đánh giá.</p>
        )}
      </section>
    </div>
  );
}
