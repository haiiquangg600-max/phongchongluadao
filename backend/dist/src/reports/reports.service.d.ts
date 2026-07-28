import { PrismaService } from '../prisma/prisma.service';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        agentId?: string;
        userId?: string;
        reason: string;
        description?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        agentId: string;
        userId: string | null;
        description: string | null;
        reason: string;
    } | {
        id: string;
        reason: string;
        description: string | undefined;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        agent: {
            id: string;
            name: string;
            phone: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        agentId: string;
        userId: string | null;
        description: string | null;
        reason: string;
    })[]>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ReportClient<{
        id: string;
        createdAt: Date;
        agentId: string;
        userId: string | null;
        description: string | null;
        reason: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
