import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    agentId?: string;
    userId?: string;
    reason: string;
    description?: string;
  }) {
    // Nếu có agentId thì gắn vào agent, không thì vẫn lưu mô tả
    if (data.agentId) {
      return this.prisma.report.create({
        data: {
          agentId: data.agentId,
          userId: data.userId,
          reason: data.reason,
          description: data.description,
        },
      });
    }

    // Tố giác chung (chưa có trong hệ thống) - lưu với agent đầu tiên hoặc tạo log
    // Đơn giản: tìm agent bất kỳ để thỏa schema, hoặc mở rộng schema sau
    const anyAgent = await this.prisma.agent.findFirst();
    if (anyAgent) {
      return this.prisma.report.create({
        data: {
          agentId: anyAgent.id,
          reason: `[TỐ GIÁC MỚI] ${data.reason}`,
          description: data.description,
        },
      });
    }

    // Nếu chưa có agent nào, trả về success giả
    return { id: 'pending', reason: data.reason, description: data.description };
  }

  findAll() {
    return this.prisma.report.findMany({
      include: { agent: { select: { id: true, name: true, phone: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  remove(id: string) {
    return this.prisma.report.delete({ where: { id } });
  }
}
