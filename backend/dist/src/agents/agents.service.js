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
exports.AgentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const client_1 = require("@prisma/client");
let AgentsService = class AgentsService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async findAll(params) {
        return this.prisma.agent.findMany({
            where: {
                status: client_1.AgentStatus.ACTIVE,
                ...(params?.featured !== undefined && { isFeatured: params.featured }),
                ...(params?.highlighted !== undefined && { isHighlighted: params.highlighted }),
            },
            orderBy: { createdAt: 'desc' },
            take: params?.limit || 20,
            include: {
                reviews: { take: 3, orderBy: { createdAt: 'desc' } },
                _count: { select: { reviews: true, transactions: true } },
            },
        });
    }
    async findOne(id) {
        const agent = await this.prisma.agent.findUnique({
            where: { id },
            include: {
                transactions: { orderBy: { date: 'desc' }, take: 20 },
                reviews: { orderBy: { createdAt: 'desc' }, take: 20 },
                reports: { orderBy: { createdAt: 'desc' }, take: 10 },
                _count: { select: { reviews: true, transactions: true, reports: true } },
            },
        });
        if (!agent)
            throw new common_1.NotFoundException('Không tìm thấy giao dịch viên');
        return agent;
    }
    async create(data) {
        return this.prisma.agent.create({ data });
    }
    async update(id, data) {
        return this.prisma.agent.update({ where: { id }, data });
    }
    async remove(id) {
        return this.prisma.agent.delete({ where: { id } });
    }
    async lock(id) {
        return this.prisma.agent.update({
            where: { id },
            data: { status: client_1.AgentStatus.LOCKED },
        });
    }
    async unlock(id) {
        return this.prisma.agent.update({
            where: { id },
            data: { status: client_1.AgentStatus.ACTIVE },
        });
    }
    async setDeposit(id, amount) {
        return this.prisma.agent.update({
            where: { id },
            data: { depositAmount: amount },
        });
    }
    async setTrustScore(id, score, source) {
        return this.prisma.agent.update({
            where: { id },
            data: { trustScore: score, trustSource: source },
        });
    }
};
exports.AgentsService = AgentsService;
exports.AgentsService = AgentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], AgentsService);
//# sourceMappingURL=agents.service.js.map