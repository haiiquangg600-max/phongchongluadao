"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database...');
    const hashed = await bcrypt.hash('admin123456', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@baohiemluadao.vn' },
        update: {},
        create: {
            email: 'admin@baohiemluadao.vn',
            password: hashed,
            name: 'Quản trị viên',
            role: client_1.UserRole.ADMIN,
        },
    });
    const agentsData = [
        {
            name: 'Nguyễn Văn An',
            phone: '0901234567',
            accountNumber: '0123456789',
            bankName: 'Vietcombank',
            facebookLink: 'https://facebook.com/nguyenvanan',
            avatarUrl: null,
            depositAmount: 50000000,
            trustScore: 4.8,
            trustSource: 'admin_set',
            verification: client_1.VerificationStatus.VERIFIED,
            status: client_1.AgentStatus.ACTIVE,
            isFeatured: true,
            isHighlighted: true,
        },
        {
            name: 'Trần Thị Bình',
            phone: '0912345678',
            accountNumber: '9876543210',
            bankName: 'Techcombank',
            facebookLink: 'https://facebook.com/tranthibinh',
            depositAmount: 30000000,
            trustScore: 4.5,
            trustSource: 'user_reviews',
            verification: client_1.VerificationStatus.VERIFIED,
            status: client_1.AgentStatus.ACTIVE,
            isFeatured: true,
            isHighlighted: false,
        },
        {
            name: 'Lê Hoàng Cường',
            phone: '0987654321',
            accountNumber: '1122334455',
            bankName: 'MB Bank',
            facebookLink: 'https://facebook.com/lehoangcuong',
            depositAmount: 0,
            trustScore: 3.2,
            trustSource: 'user_reviews',
            verification: client_1.VerificationStatus.UNVERIFIED,
            status: client_1.AgentStatus.ACTIVE,
            isFeatured: false,
            isHighlighted: false,
        },
        {
            name: 'Phạm Minh Đức',
            phone: '0977123456',
            accountNumber: '5566778899',
            bankName: 'VPBank',
            facebookLink: 'https://facebook.com/phamminhduc',
            depositAmount: 100000000,
            trustScore: 4.9,
            trustSource: 'admin_set',
            verification: client_1.VerificationStatus.VERIFIED,
            status: client_1.AgentStatus.ACTIVE,
            isFeatured: true,
            isHighlighted: true,
        },
        {
            name: 'Hoàng Thị Em',
            phone: '0966987654',
            accountNumber: '9988776655',
            bankName: 'ACB',
            facebookLink: 'https://facebook.com/hoangthiem',
            depositAmount: 20000000,
            trustScore: 4.1,
            trustSource: 'user_reviews',
            verification: client_1.VerificationStatus.VERIFIED,
            status: client_1.AgentStatus.ACTIVE,
            isFeatured: false,
            isHighlighted: true,
        },
    ];
    for (const data of agentsData) {
        const agent = await prisma.agent.create({ data });
        if (agent.depositAmount > 0) {
            await prisma.transaction.createMany({
                data: [
                    {
                        agentId: agent.id,
                        amount: 15000000,
                        description: 'Giao dịch thành công - Khách hàng A',
                        date: new Date('2025-11-15'),
                    },
                    {
                        agentId: agent.id,
                        amount: 8500000,
                        description: 'Giao dịch thành công - Khách hàng B',
                        date: new Date('2025-12-02'),
                    },
                ],
            });
        }
        await prisma.review.createMany({
            data: [
                {
                    agentId: agent.id,
                    rating: Math.round(agent.trustScore),
                    comment: 'Giao dịch nhanh, uy tín.',
                },
                {
                    agentId: agent.id,
                    rating: Math.max(1, Math.round(agent.trustScore) - 1),
                    comment: 'Ổn, hỗ trợ tốt.',
                },
            ],
        });
    }
    console.log('Seed completed. Admin: admin@baohiemluadao.vn / admin123456');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map