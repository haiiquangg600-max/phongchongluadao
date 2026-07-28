import { PrismaService } from '../prisma/prisma.service';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        agentId: string;
        amount: number;
        description?: string;
        date?: Date;
    }): import(".prisma/client").Prisma.Prisma__TransactionClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        amount: number;
        agentId: string;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findByAgent(agentId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        amount: number;
        agentId: string;
        description: string | null;
    }[]>;
    update(id: string, data: any): import(".prisma/client").Prisma.Prisma__TransactionClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        amount: number;
        agentId: string;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TransactionClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        amount: number;
        agentId: string;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
