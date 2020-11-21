import { Request, Response } from 'express';
import { Database } from '../classes/Database';
import { EngineOperation } from '../classes/EngineOperation';

class EngineOperationController {
  async store(req:Request, res: Response) {
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