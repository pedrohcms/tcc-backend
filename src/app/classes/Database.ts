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
  public static getInstance(): PrismaClient {
    const prisma = Database.getInstance();
    
    Database.initTimezone(prisma);
    
    return prisma;
  }

  /**
   * Método responsável por setar a timezone do banco de dados
   * @param prisma PrismaClient
   */
  public static initTimezone(prisma: PrismaClient) {
    prisma.$executeRaw("SET TIMEZONE=-3");
  }
}