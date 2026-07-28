import { PrismaService } from '../prisma/prisma.service';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        agentId: string;
        userId?: string;
        rating: number;
        comment?: string;
    }): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        comment: string | null;
        agentId: string;
        userId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findByAgent(agentId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        comment: string | null;
        agentId: string;
        userId: string | null;
    }[]>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        comment: string | null;
        agentId: string;
        userId: string | null;
    }>;
}
