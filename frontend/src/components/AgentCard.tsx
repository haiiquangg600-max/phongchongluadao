import Link from 'next/link';
import { ShieldCheck, ShieldAlert, Star, Banknote } from 'lucide-react';
import { formatMoney } from '@/lib/api';

interface Agent {
  id: string;
  name: string;
  phone?: string;
  bankName?: string;
  depositAmount: number;
  trustScore: number;
  verification: 'VERIFIED' | 'UNVERIFIED';
  avatarUrl?: string;
}

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/agent/${agent.id}`}
      className="group block rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:border-primary-400 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 text-xl font-bold">
          {agent.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold group-hover:text-primary-600 transition">
              {agent.name}
            </h3>
            {agent.verification === 'VERIFIED' ? (
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            ) : (
              <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0" />
            )}
          </div>
          <p className="mt-0.5 text-sm text-slate-500 truncate">
            {agent.phone || 'Chưa có SĐT'} · {agent.bankName || '—'}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-amber-500">
              <Star className="h-3.5 w-3.5 fill-current" />
              {agent.trustScore.toFixed(1)}
            </span>
            {agent.depositAmount > 0 && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <Banknote className="h-3.5 w-3.5" />
                Cọc {formatMoney(agent.depositAmount)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
