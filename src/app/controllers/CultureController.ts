import { Request, Response } from "express";
import { Database } from "../classes/Database";

/**
 * Class responsible for handling CRUD for cultures
 * 
 * @author Pedro Henrique Correa Mota da Silva
 */
class CultureController {
  async store(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    const { name, idealMoisture } = req.body;

    const culture = await prisma.cultures.create({
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

    prisma.$disconnect();

    return res.status(201).json(culture);
  }

  async show(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    const id = Number(req.params.id);

    const culture = await prisma.cultures.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        ideal_moisture: true,
      }
    })

    prisma.$disconnect();

    if(culture === null) {
      return res.status(400).json({"error": res.__("Culture not found")});
    } 

    return res.status(200).json(culture);
  }

  async destroy(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    const id = Number(req.params.id);

    const culture = await prisma.cultures.findUnique({
      where: {
        id
      }
    });
    
    if(culture === null) {
      prisma.$disconnect();
      return res.status(400).json({"error": res.__("Culture not found")});
    }

    await prisma.cultures.delete({
      where: {
        id
      }
    });

    prisma.$disconnect();
    return res.sendStatus(200);
  }
  
}

export default new CultureController();