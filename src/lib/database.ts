import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error'],
    errorFormat: 'pretty',
  });
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: ['query', 'error'],
      errorFormat: 'pretty',
    });
  }
  prisma = globalForPrisma.prisma;
}

// Test connection and provide fallback
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

// Initialize connection test in non-production environments
if (process.env.NODE_ENV !== 'production') {
  testConnection();
}

export { prisma };
