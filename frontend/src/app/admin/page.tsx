'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch, formatMoney } from '@/lib/api';
import {
  Plus, Lock, Unlock, Trash2, Shield, LogOut,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', accountNumber: '', bankName: '', facebookLink: '',
    depositAmount: 0, trustScore: 0, verification: 'UNVERIFIED',
  });
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      // Chưa đăng nhập → đá về trang login
      router.replace('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'ADMIN') {
        // Không phải admin → đá về trang chủ
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.replace('/');
        return;
      }
      setAuthorized(true);
      loadData();
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.replace('/login');
    }
  }, [router]);

  const loadData = async () => {
    try {
      const [a, s] = await Promise.all([
        apiFetch('/agents?limit=50'),
        apiFetch('/stats'),
      ]);
      setAgents(a);
      setStats(s);
    } catch {
      // Token hết hạn hoặc lỗi → đăng xuất
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch('/agents', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          depositAmount: Number(form.depositAmount),
          trustScore: Number(form.trustScore),
          trustSource: 'admin_set',
        }),
      });
      setShowForm(false);
      setForm({ name: '', phone: '', accountNumber: '', bankName: '', facebookLink: '', depositAmount: 0, trustScore: 0, verification: 'UNVERIFIED' });
      loadData();
    } catch (err: any) {
      alert(err.message || 'Có lỗi xảy ra');
    }
  };

  const handleLock = async (id: string, locked: boolean) => {
    try {
      await apiFetch(`/agents/${id}/${locked ? 'unlock' : 'lock'}`, { method: 'POST' });
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Xóa giao dịch viên này?')) return;
    try {
      await apiFetch(`/agents/${id}`, { method: 'DELETE' });
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.replace('/');
  };

  // Chưa xác thực xong thì không hiện gì
  if (!authorized || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Đang kiểm tra quyền truy cập...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary-600" /> Admin Panel
          </h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý giao dịch viên & dữ liệu hệ thống</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            <Plus className="h-4 w-4" /> Thêm GTV
          </button>
          <button onClick={logout} className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
            <LogOut className="h-4 w-4" /> Đăng xuất
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <p className="text-sm text-slate-500">Tổng GTV</p>
          <p className="text-2xl font-bold">{stats.totalAgents || 0}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <p className="text-sm text-slate-500">Lượt tra cứu</p>
          <p className="text-2xl font-bold">{stats.totalSearches || 0}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <p className="text-sm text-slate-500">Đánh giá</p>
          <p className="text-2xl font-bold">{stats.totalReviews || 0}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <p className="text-sm text-slate-500">Báo cáo</p>
          <p className="text-2xl font-bold">{stats.totalReports || 0}</p>
        </div>
      </div>

      {/* Create form */}
      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
          <h2 className="font-semibold text-lg">Thêm giao dịch viên mới</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Tên *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500" />
            <input placeholder="Số điện thoại" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500" />
            <input placeholder="Số tài khoản" value={form.accountNumber} onChange={(e) => setForm({ ...form, accountNumber: e.target.value })} className="rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500" />
            <input placeholder="Ngân hàng" value={form.bankName} onChange={(e) => setForm({ ...form, bankName: e.target.value })} className="rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500" />
            <input placeholder="Link Facebook" value={form.facebookLink} onChange={(e) => setForm({ ...form, facebookLink: e.target.value })} className="rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500" />
            <input type="number" placeholder="Số tiền cọc (VND)" value={form.depositAmount} onChange={(e) => setForm({ ...form, depositAmount: Number(e.target.value) })} className="rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500" />
            <input type="number" step="0.1" min="0" max="5" placeholder="Điểm uy tín (0-5)" value={form.trustScore} onChange={(e) => setForm({ ...form, trustScore: Number(e.target.value) })} className="rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500" />
            <select value={form.verification} onChange={(e) => setForm({ ...form, verification: e.target.value })} className="rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500">
              <option value="UNVERIFIED">Chưa xác minh</option>
              <option value="VERIFIED">Đã xác minh</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="rounded-xl bg-primary-600 px-5 py-2 text-sm font-medium text-white hover:bg-primary-700">Lưu</button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-[var(--border)] px-5 py-2 text-sm">Hủy</button>
          </div>
        </form>
      )}

      {/* Agents table */}
      <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Tên</th>
              <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">SĐT</th>
              <th className="px-4 py-3 text-left font-medium">Cọc</th>
              <th className="px-4 py-3 text-left font-medium">Uy tín</th>
              <th className="px-4 py-3 text-left font-medium">Trạng thái</th>
              <th className="px-4 py-3 text-right font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a.id} className="border-t border-[var(--border)]">
                <td className="px-4 py-3">
                  <Link href={`/agent/${a.id}`} className="font-medium hover:text-primary-600">
                    {a.name}
                  </Link>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell text-slate-500">{a.phone || '—'}</td>
                <td className="px-4 py-3">{a.depositAmount > 0 ? formatMoney(a.depositAmount) : '—'}</td>
                <td className="px-4 py-3">{a.trustScore.toFixed(1)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    a.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' :
                    'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                  }`}>
                    {a.status === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => handleLock(a.id, a.status === 'LOCKED')} className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800" title={a.status === 'LOCKED' ? 'Mở khóa' : 'Khóa'}>
                      {a.status === 'LOCKED' ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    </button>
                    <button onClick={() => handleDelete(a.id)} className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20" title="Xóa">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
