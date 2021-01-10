import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Database } from "../classes/Database";

/**
 * Class responsible for handling CRUD for farm culture
 * 
 * @author Pedro Henrique Correa Mota da Silva
 */
class FarmCultureController {
  async show(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    const id = Number(req.params.id);

    const farmCulture = await prisma.farm_culture.findUnique({
      where: {
        id
      }
    });

    if(farmCulture === null) {
      prisma.$disconnect();
      
      return res.status(400).json({ "error":res.__("Farm's culture not found") });
    }

    return res.status(200).json(farmCulture);
  }

  async store(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    const { farmId, sector, cultureId } = req.body;

    let farmCulture = await prisma.farm_culture.findMany({
      where: {
        farm_id: farmId,
        sector,
        culture_id: cultureId,
      }
    });

    // IF THE COLLECTION SIZE IS LARGER THAN ZERO, THE VALUE IS ALREADY REGISTERED
    if(farmCulture.length > 0) {
      prisma.$disconnect();
      return res.status(400).json({ "error": res.__("Farm's culture already exists") });
    }

    const registeredFarmCulture = await prisma.farm_culture.create({
      data: {
        sector,
        farms: {
          connect: {
            id: farmId
          }
        },
        cultures: {
          connect: {
            id: cultureId
          }
        }
      }
    });

    prisma.$disconnect();

    return res.status(200).json(registeredFarmCulture);
  }

  async destroy(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    const id = Number(req.params.id);

    const culture = await prisma.farm_culture.findUnique({
      where: {
        id
      }
    });
    
    if(culture === null) {
      prisma.$disconnect();
      return res.status(400).json({"error": res.__("Farm's culture not found")});
    }

    await prisma.farm_culture.delete({
      where: {
        id
      }
    });

    prisma.$disconnect();

    return res.sendStatus(200);
  }
}

export default new FarmCultureController();