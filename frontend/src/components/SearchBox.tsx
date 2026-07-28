'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Phone, CreditCard, Facebook, User } from 'lucide-react';

const TYPES = [
  { value: 'general', label: 'Tất cả', icon: Search },
  { value: 'phone', label: 'Số điện thoại', icon: Phone },
  { value: 'account', label: 'Số tài khoản', icon: CreditCard },
  { value: 'facebook', label: 'Link Facebook', icon: Facebook },
  { value: 'name', label: 'Tên GTV', icon: User },
];

export default function SearchBox({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('general');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}&type=${type}`);
  };

  return (
    <form onSubmit={handleSearch} className={`w-full ${large ? 'max-w-3xl' : 'max-w-xl'}`}>
      <div className="flex flex-wrap gap-2 mb-3 justify-center">
        {TYPES.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setType(t.value)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                type === t.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập số điện thoại, số tài khoản, link Facebook hoặc tên..."
          className={`w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] pl-12 pr-28 text-base outline-none focus:ring-2 focus:ring-primary-500 transition ${
            large ? 'py-4 text-lg' : 'py-3'
          }`}
        />
        <button
          type="submit"
          className="absolute right-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition"
        >
          Tra cứu
        </button>
      </div>
    </form>
  );
}
