# baohiemluadao.vn

Nền tảng tra cứu & quản lý thông tin giao dịch viên.

**Thiết kế hoàn toàn mới** – không sao chép bất kỳ website nào.

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + next-themes (Dark/Light)
- **Backend**: NestJS + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis
- **Deploy**: Docker Compose

## Tính năng

### Người dùng
- Tra cứu theo: Số điện thoại / Số tài khoản / Link Facebook / Tên GTV
- Xem thống kê tổng quan
- Xem danh sách GTV mới / nổi bật / đánh giá cao
- Chi tiết GTV: thông tin, cọc, điểm uy tín, lịch sử giao dịch, đánh giá
- Trạng thái xác minh (✓ Đã xác minh / ⚠ Chưa xác minh)

### Admin Panel
- Thêm / Sửa / Xóa giao dịch viên
- Khóa / Mở khóa GTV
- Thiết lập số tiền cọc
- Thiết lập điểm uy tín + nguồn (admin_set / user_reviews)
- Quản lý lịch sử giao dịch, đánh giá, báo cáo, người dùng

## Chạy dự án

### Yêu cầu
- Docker & Docker Compose
- Node.js 20+ (nếu chạy local không dùng Docker)

### Cách 1: Docker (khuyến nghị)

```bash
cd baohiemluadao
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- PostgreSQL: localhost:5432
- Redis: localhost:6379

Sau khi container chạy, vào backend container để migrate + seed:

```bash
docker compose exec backend npx prisma migrate dev --name init
docker compose exec backend npx prisma db seed
```

### Cách 2: Local development

**Backend**
```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## Tài khoản demo

- **Admin**: `admin@baohiemluadao.vn` / `admin123456`

## Lưu ý quan trọng

- Tất cả dữ liệu hiển thị đều do **quản trị viên nhập** hoặc từ đánh giá người dùng thật trên hệ thống.
- Không tự động crawl / lấy dữ liệu từ nguồn bên ngoài không được phép.
- Màu chủ đạo: Xanh dương – Trắng – Xám đậm.
- Font: Inter + Be Vietnam Pro.
- Responsive đầy đủ (mobile / tablet / desktop).
- Dark Mode + Light Mode.

## Cấu trúc thư mục

```
baohiemluadao/
├── docker-compose.yml
├── backend/          # NestJS API
│   ├── prisma/
│   └── src/
├── frontend/         # Next.js App
│   └── src/
└── README.md
```

---
© 2026 baohiemluadao.vn – Xây dựng từ đầu.
"# Chongluadao" 
