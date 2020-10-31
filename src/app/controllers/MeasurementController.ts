import { measurementsCreateInput, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Measure } from "../classes/Measure";

/**
 * Class responsible for handling CRUD for measurement data
 */
class MeasurementController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async index(req: Request, res: Response) {
    const farmId = Number(req.query.farmId);
    let { startDate, endDate, orderBy, queryType } = req.query;

    const farm = await this.prisma.farms.findOne({
      where: {
        id: farmId,
      },
    });

    if (!farm) {
      this.prisma.$disconnect();
      return res.status(400).json({ error: res.__("Farm not found") });
    } 

    startDate = String(startDate);
    endDate = String(endDate);

    let measurements = await Measure.getMeasures(farmId, new Date(startDate), new Date(endDate));
    measurements = Measure.sumMeasures(measurements);
    
    this.prisma.$disconnect();

    return res.status(200).json(measurements);
  }

  async store(req: Request, res: Response) {
    const { farmCultureId, waterAmount, moisture, createdAt } = req.body;

    const farmCulture = await this.prisma.farm_culture.findOne({
      where: {
        id: farmCultureId
      }
    });

    if (!farmCulture) {
      this.prisma.$disconnect();
      return res.status(400).json({ error: res.__("Farm not found") });
    }

    const data: measurementsCreateInput = {
      water_amount: waterAmount,
      moisture: moisture,
      farm_culture: {
        connect: {
          id: farmCultureId
        }
      }
    };

    if (createdAt != undefined) {
      data.created_at = createdAt;
    }

    const measurement = await this.prisma.measurements.create({
      data,
      select: {
        id: true,
        farm_culture_id: true,
        water_amount: true,
        moisture: true,
        created_at: true
      }
    });

    this.prisma.$disconnect();

    return res.status(200).json(measurement);
  }
}

export default new MeasurementController();
