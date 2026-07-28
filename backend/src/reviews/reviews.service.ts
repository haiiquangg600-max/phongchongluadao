import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  create(data: { agentId: string; userId?: string; rating: number; comment?: string }) {
    return this.prisma.review.create({ data });
  }

  findByAgent(agentId: string) {
    return this.prisma.review.findMany({
      where: { agentId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(id: string) {
    return this.prisma.review.delete({ where: { id } });
  }
}
