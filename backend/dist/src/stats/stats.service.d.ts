import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
export declare class StatsService {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: RedisService);
    getOverview(): Promise<any>;
}
