import { env } from '@fintrack/env';
import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';


neonConfig.webSocketConstructor = ws;

const pool = new Pool({
   connectionString: env.DATABASE_URL,
  log:env.NODE_ENV === 'local' ? ['query', 'error', 'warn'] : ['error'],
  });
const adapter = new PrismaNeon(pool);

export const prisma = new PrismaClient({ adapter });

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     adapter,
//     // log: env.NODE_ENV === 'local' ? ['query', 'error', 'warn'] : ['error'],
//   });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export { Prisma } from '@prisma/client';