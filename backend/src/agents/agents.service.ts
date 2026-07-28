import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { VerificationStatus, AgentStatus } from '@prisma/client';

@Injectable()
export class AgentsService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async findAll(params?: { featured?: boolean; highlighted?: boolean; limit?: number }) {
    return this.prisma.agent.findMany({
      where: {
        status: AgentStatus.ACTIVE,
        ...(params?.featured !== undefined && { isFeatured: params.featured }),
        ...(params?.highlighted !== undefined && { isHighlighted: params.highlighted }),
      },
      orderBy: { createdAt: 'desc' },
      take: params?.limit || 20,
      include: {
        reviews: { take: 3, orderBy: { createdAt: 'desc' } },
        _count: { select: { reviews: true, transactions: true } },
      },
    });
  }

  async findOne(id: string) {
    const agent = await this.prisma.agent.findUnique({
      where: { id },
      include: {
        transactions: { orderBy: { date: 'desc' }, take: 20 },
        reviews: { orderBy: { createdAt: 'desc' }, take: 20 },
        reports: { orderBy: { createdAt: 'desc' }, take: 10 },
        _count: { select: { reviews: true, transactions: true, reports: true } },
      },
    });
    if (!agent) throw new NotFoundException('Không tìm thấy giao dịch viên');
    return agent;
  }

  async create(data: any) {
    return this.prisma.agent.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.agent.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.agent.delete({ where: { id } });
  }

  async lock(id: string) {
    return this.prisma.agent.update({
      where: { id },
      data: { status: AgentStatus.LOCKED },
    });
  }

  async unlock(id: string) {
    return this.prisma.agent.update({
      where: { id },
      data: { status: AgentStatus.ACTIVE },
    });
  }

  async setDeposit(id: string, amount: number) {
    return this.prisma.agent.update({
      where: { id },
      data: { depositAmount: amount },
    });
  }

  async setTrustScore(id: string, score: number, source: string) {
    return this.prisma.agent.update({
      where: { id },
      data: { trustScore: score, trustSource: source },
    });
  }
}
