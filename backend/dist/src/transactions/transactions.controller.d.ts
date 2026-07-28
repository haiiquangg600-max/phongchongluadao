import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private transactionsService;
    constructor(transactionsService: TransactionsService);
    findByAgent(agentId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        amount: number;
        agentId: string;
        description: string | null;
    }[]>;
    create(body: any): import(".prisma/client").Prisma.Prisma__TransactionClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        amount: number;
        agentId: string;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, body: any): import(".prisma/client").Prisma.Prisma__TransactionClient<{
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
