import { Request, Response } from 'express';
import { Database } from '../classes/Database';
import { EngineOperation } from '../classes/EngineOperation';

class EngineOperationController {
  async show(req: Request, res: Response) {
    const { farmId, startDateTime, endDateTime } = req.query;

    const prisma = await Database.getInstance();

    const farm = await prisma.farms.findFirst({
      where: {
        id: Number(farmId)
      },
    });

    prisma.$disconnect();

    if(!farm) return res.status(400).json({ error: res.__("Farm not found") });

    const results = await EngineOperation.calculateEngineOperation(Number(farmId), new Date(String(startDateTime)) , new Date(String(endDateTime)));

    return res.status(200).json(results);
  }

  async store(req: Request, res: Response) {
    const { farmId, startDateTime, endDateTime } = req.body;

    const prisma = await Database.getInstance();

    const farm = await prisma.farms.findFirst({
      where: {
        id: farmId
      },
    });

    prisma.$disconnect();

    if(!farm) return res.status(400).json({ error: res.__("Farm not found") });
    
    const engineOperation = await EngineOperation.createEngineOperation(farmId, startDateTime, endDateTime);

    return res.status(201).json(engineOperation);
  }
}

export default new EngineOperationController;