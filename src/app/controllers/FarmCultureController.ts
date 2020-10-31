import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

class FarmCultureController {
  private prisma: PrismaClient;
  
  constructor() {
    this.prisma = new PrismaClient();
  }

  async show(req: Request, res: Response) {
    const id = Number(req.params.id);

    const farmCulture = await this.prisma.farm_culture.findOne({
      where: {
        id
      }
    });

    if(farmCulture === null) {
      this.prisma.$disconnect();
      return res.status(400).json({ "error":res.__("Farm's culture not found") });
    }

    return res.status(200).json(farmCulture);
  }

  async store(req: Request, res: Response) {
    const { farmId, sector, cultureId } = req.body;

    let farmCulture = await this.prisma.farm_culture.findMany({
      where: {
        farm_id: farmId,
        sector,
        culture_id: cultureId,
      }
    });

    // CASO O TAMANHO DA COLEÇÃO SEJA MAIOR QUE ZERO QUER DIZER QUE O VALOR JÁ ESTÁ CADASTRADO
    if(farmCulture.length > 0) {
      this.prisma.$disconnect();
      return res.status(400).json({ "error": res.__("Farm's culture already exists") });
    }

    const registeredFarmCulture = await this.prisma.farm_culture.create({
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

    this.prisma.$disconnect();
    return res.status(200).json(registeredFarmCulture);
  }

  async destroy(req: Request, res: Response) {
    const id = Number(req.params.id);

    const culture = await this.prisma.farm_culture.findOne({
      where: {
        id
      }
    });
    
    if(culture === null) {
      this.prisma.$disconnect();
      return res.status(400).json({"error": res.__("Farm's culture not found")});
    }

    await this.prisma.farm_culture.delete({
      where: {
        id
      }
    });

    this.prisma.$disconnect();
    return res.sendStatus(200);
  }
}

export default new FarmCultureController();