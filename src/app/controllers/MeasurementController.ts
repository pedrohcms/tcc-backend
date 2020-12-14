import { measurementsCreateInput } from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";
import { Request, Response } from "express";
import { Database } from "../classes/Database";
import { Measure } from "../classes/Measure";

/**
 * Class responsible for handling CRUD for measurement data
 * 
 * @author Pedro Henrique Correa Mota da Silva
 */
class MeasurementController {
  async index(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    const farmId = Number(req.query.farmId);
    let { startDate, endDate, queryType } = req.query;

    const farm = await prisma.farms.findOne({
      where: {
        id: farmId,
      },
    });

    if (!farm) {
      prisma.$disconnect();
      return res.status(400).json({ error: res.__("Farm not found") });
    } 

    startDate = String(startDate);
    endDate = String(endDate);

    let startDateTime = new Date(startDate);
    let endDateTime = new Date(endDate);

    // SETTING UP THE START OF THE DAY AND THE END OF THE DAY
    startDateTime = startOfDay(startDateTime);
    endDateTime = endOfDay(endDateTime); 

    let measurements = await Measure.getMeasures(farmId, startDateTime, endDateTime);

    prisma.$disconnect();

    switch (queryType) {
      case "LIST":
        return res.status(200).json(measurements);

      case "SUM":
        measurements = Measure.sumMeasures(measurements);
        return res.status(200).json(measurements);
    }
  }

  async store(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    const { farmCultureId, waterAmount, moisture, createdAt } = req.body;

    const farmCulture = await prisma.farm_culture.findOne({
      where: {
        id: farmCultureId
      }
    });

    if (!farmCulture) {
      prisma.$disconnect();
      
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

    const measurement = await prisma.measurements.create({
      data,
      select: {
        id: true,
        farm_culture_id: true,
        water_amount: true,
        moisture: true,
        created_at: true
      }
    });

    prisma.$disconnect();

    return res.status(200).json(measurement);
  }
}

export default new MeasurementController();
