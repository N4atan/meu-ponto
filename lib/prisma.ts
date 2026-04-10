import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = () => {
  // Cria o Pool de conexões padrão apontando para a sua Supabase
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  // Cria o Adaptador PG obrigatório no Prisma v7
  const adapter = new PrismaPg(pool);
  
  // Instancia nosso querido PrismaClient utilizando o adaptador
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
