import { PrismaClient } from '@prisma/client';
import { mockDb } from './mock-database';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  isDbAvailable: boolean | undefined;
};

let prisma: PrismaClient;
let isDbAvailable = true;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error'],
    errorFormat: 'pretty',
  });
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: ['error'],
      errorFormat: 'pretty',
    });
  }
  prisma = globalForPrisma.prisma;
}

// Test database connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    isDbAvailable = true;
    if (typeof globalForPrisma !== 'undefined') {
      globalForPrisma.isDbAvailable = true;
    }
  } catch (error) {
    console.warn('Database connection failed, using mock data:', error);
    isDbAvailable = false;
    if (typeof globalForPrisma !== 'undefined') {
      globalForPrisma.isDbAvailable = false;
    }
  }
}

// Initialize connection test
testConnection();

// Database wrapper that falls back to mock data
export const db = {
  async interview() {
    if (isDbAvailable || globalForPrisma.isDbAvailable !== false) {
      try {
        return prisma.interview;
      } catch (error) {
        console.warn('Database operation failed, using mock data');
        isDbAvailable = false;
        return mockDbAdapter.interview;
      }
    }
    return mockDbAdapter.interview;
  },

  async question() {
    if (isDbAvailable || globalForPrisma.isDbAvailable !== false) {
      try {
        return prisma.question;
      } catch (error) {
        console.warn('Database operation failed, using mock data');
        isDbAvailable = false;
        return mockDbAdapter.question;
      }
    }
    return mockDbAdapter.question;
  },

  async answer() {
    if (isDbAvailable || globalForPrisma.isDbAvailable !== false) {
      try {
        return prisma.answer;
      } catch (error) {
        console.warn('Database operation failed, using mock data');
        isDbAvailable = false;
        return mockDbAdapter.answer;
      }
    }
    return mockDbAdapter.answer;
  }
};

// Mock database adapter
const mockDbAdapter = {
  interview: {
    create: ({ data }: any) => mockDb.createInterview(data),
    findUnique: ({ where, include }: any) => mockDb.findInterview(where.id),
    update: ({ where, data }: any) => mockDb.updateInterview(where.id, data),
  },
  question: {
    create: ({ data }: any) => mockDb.createQuestion(data),
    findUnique: ({ where }: any) => mockDb.findQuestion(where.id),
  },
  answer: {
    create: ({ data }: any) => mockDb.createAnswer(data),
    count: ({ where }: any) => mockDb.countAnswers(where.interviewId),
  },
};

export { prisma };
