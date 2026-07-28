"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const client_1 = require("@prisma/client");
let SearchService = class SearchService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async search(query, type) {
        const q = query.trim();
        if (!q)
            return [];
        await this.prisma.searchLog.create({
            data: { query: q, type: type || 'general' },
        });
        const cacheKey = `search:${type || 'all'}:${q.toLowerCase()}`;
        const cached = await this.redis.get(cacheKey);
        if (cached)
            return JSON.parse(cached);
        let where = { status: client_1.AgentStatus.ACTIVE };
        if (type === 'phone') {
            where.phone = { contains: q };
        }
        else if (type === 'account') {
            where.accountNumber = { contains: q };
        }
        else if (type === 'facebook') {
            where.facebookLink = { contains: q, mode: 'insensitive' };
        }
        else if (type === 'name') {
            where.name = { contains: q, mode: 'insensitive' };
        }
        else {
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
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], SearchService);
//# sourceMappingURL=search.service.js.map