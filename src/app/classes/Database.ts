import { PrismaClient } from '@prisma/client';

/**
 * Classe responsável por retornar instâncias do banco de dados e executar operações de inicialização do mesmo
 * 
 * @author Pedro Henrique Correa Mota da Silva
 */
export class Database {
  
  /**
   * Método responsável por retornar uma instância do Prisma
   */
  static async getInstance(): Promise<PrismaClient> {
    const prisma = new PrismaClient();
    
    await Database.initTimezone(prisma);
    
    return prisma;
  }

  /**
   * Método responsável por setar a timezone do banco de dados
   * @param prisma PrismaClient
   */
  static async initTimezone(prisma: PrismaClient) {
    await prisma.$executeRaw("SET TIMEZONE=-3");
  }
}