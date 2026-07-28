import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
export declare class SearchService {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: RedisService);
    search(query: string, type?: string): Promise<any>;
}
