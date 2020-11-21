import { Request, Response } from 'express';
import { Database } from '../classes/Database';
import { FarmConfiguration } from '../classes/FarmConfiguration';

class FarmConfigurationController {
  async show(req: Request, res: Response) {
    const farmId = Number(req.params.id);

    const prisma = await Database.getInstance();

    const farm = await prisma.farms.findFirst({
      where: {
        id: farmId
      }
    });

    prisma.$disconnect();

    if(!farm) return res.status(400).json({ error: res.__("Farm not found") });

    const farmConfiguration = await FarmConfiguration.getFarmConfiguration(farmId);

    return res.status(200).json(farmConfiguration);
  }

  async update(req: Request, res: Response) {
    const farmId = Number(req.params.id);
    const { engineType, unityAmount, unityPrice } = req.body;
    
    const prisma = await Database.getInstance();

    const farm = await prisma.farms.findFirst({
      where: {
        id: farmId
      }
    });

    prisma.$disconnect();

    if(!farm) return res.status(400).json({ error: res.__("Farm not found") });

    if(unityAmount < 0) return res.status(400).json({ error: res.__("The value of the unityAmount field must be greater than zero") });

    if(unityPrice < 0) return res.status(400).json({ error: res.__("The value of the unityPrice field must be greater than zero") });

    const farmConfiguration = await FarmConfiguration.updateFarmConfiguration(farmId, engineType, unityAmount, unityPrice);

    return res.status(200).json(farmConfiguration);
  }
}

export default new FarmConfigurationController;