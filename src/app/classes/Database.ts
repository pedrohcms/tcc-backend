import { PrismaClient } from '@prisma/client';

/**
 * Class responsible for returning instances of the database and performing database startup operations
 * 
 * @author Pedro Henrique Correa Mota da Silva
 */
export class Database {
  
  /**
   * Method responsible for returning an instance of Prisma
   */
  static async getInstance(): Promise<PrismaClient> {
    const prisma = new PrismaClient();
    
    await Database.initTimezone(prisma);
    
    return prisma;
  }

  /**
   * Method responsible for setting the database timezone
   */
  static async initTimezone(prisma: PrismaClient) {
    await prisma.$executeRaw("SET TIMEZONE=-3");
  }
}