'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBox from '@/components/SearchBox';
import AgentCard from '@/components/AgentCard';
import { apiFetch } from '@/lib/api';
import { SearchX } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'general';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    apiFetch(`/search?q=${encodeURIComponent(q)}&type=${type}`)
      .then(setResults)
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [q, type]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex justify-center">
        <SearchBox />
      </div>

      {q && (
        <div className="mb-6">
          <h1 className="text-xl font-semibold">
            Kết quả tra cứu: <span className="text-primary-600">“{q}”</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {loading ? 'Đang tìm...' : `${results.length} kết quả`}
          </p>
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <AgentCard key={a.id} agent={a} />
          ))}
        </div>
      ) : q ? (
        <div className="flex flex-col items-center py-20 text-slate-500">
          <SearchX className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">Không tìm thấy kết quả</p>
          <p className="text-sm mt-1">Thử tìm với từ khóa khác hoặc kiểm tra lại thông tin.</p>
        </div>
      ) : null}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Đang tải...</div>}>
      <SearchContent />
    </Suspense>
  );
}
