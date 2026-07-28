import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  create(data: { agentId: string; amount: number; description?: string; date?: Date }) {
    return this.prisma.transaction.create({ data });
  }

  findByAgent(agentId: string) {
    return this.prisma.transaction.findMany({
      where: { agentId },
      orderBy: { date: 'desc' },
    });
  }

  update(id: string, data: any) {
    return this.prisma.transaction.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.transaction.delete({ where: { id } });
  }
}
