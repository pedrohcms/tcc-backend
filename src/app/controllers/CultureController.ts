import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Database } from "../classes/Database";

class CultureController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = Database.getInstance();
  }

  async store(req: Request, res: Response) {
    const { name, idealMoisture } = req.body;

    const culture = await this.prisma.cultures.create({
      data: {
        name,
        ideal_moisture: Number(idealMoisture)
      },
      select: {
        id: true,
        name: true,
        ideal_moisture: true
      }
    });

    this.prisma.$disconnect();

    return res.status(201).json(culture);
  }

  async show(req: Request, res: Response) {
    const id = Number(req.params.id);

    const culture = await this.prisma.cultures.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        ideal_moisture: true,
      }
    })

    this.prisma.$disconnect();

    if(culture === null) {
      return res.status(400).json({"error": res.__("Culture not found")});
    } 

    return res.status(200).json(culture);
  }

  async destroy(req: Request, res: Response) {
    const id = Number(req.params.id);

    const culture = await this.prisma.cultures.findOne({
      where: {
        id
      }
    });
    
    if(culture === null) {
      this.prisma.$disconnect();
      return res.status(400).json({"error": res.__("Culture not found")});
    }

    await this.prisma.cultures.delete({
      where: {
        id
      }
    });

    this.prisma.$disconnect();
    return res.sendStatus(200);
  }
  
}

export default new CultureController();