import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { AgentStatus } from '@prisma/client';

@Injectable()
export class StatsService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async getOverview() {
    const cacheKey = 'stats:overview';
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const [totalAgents, totalSearches, totalReviews, totalReports] = await Promise.all([
      this.prisma.agent.count({ where: { status: AgentStatus.ACTIVE } }),
      this.prisma.searchLog.count(),
      this.prisma.review.count(),
      this.prisma.report.count(),
    ]);

    const data = { totalAgents, totalSearches, totalReviews, totalReports };
    await this.redis.set(cacheKey, JSON.stringify(data), 60);
    return data;
  }
}
