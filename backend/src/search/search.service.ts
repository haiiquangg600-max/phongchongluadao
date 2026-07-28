import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { AgentStatus } from '@prisma/client';

@Injectable()
export class SearchService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async search(query: string, type?: string) {
    const q = query.trim();
    if (!q) return [];

    // Log search
    await this.prisma.searchLog.create({
      data: { query: q, type: type || 'general' },
    });

    // Cache key
    const cacheKey = `search:${type || 'all'}:${q.toLowerCase()}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    let where: any = { status: AgentStatus.ACTIVE };

    if (type === 'phone') {
      where.phone = { contains: q };
    } else if (type === 'account') {
      where.accountNumber = { contains: q };
    } else if (type === 'facebook') {
      where.facebookLink = { contains: q, mode: 'insensitive' };
    } else if (type === 'name') {
      where.name = { contains: q, mode: 'insensitive' };
    } else {
      // general search
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { phone: { contains: q } },
        { accountNumber: { contains: q } },
        { facebookLink: { contains: q, mode: 'insensitive' } },
      ];
    }

    const results = await this.prisma.agent.findMany({
      where,
      include: {
        _count: { select: { reviews: true, transactions: true } },
        reviews: { take: 2, orderBy: { createdAt: 'desc' } },
      },
      take: 20,
    });

    await this.redis.set(cacheKey, JSON.stringify(results), 180);
    return results;
  }
}
