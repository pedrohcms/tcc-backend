import { measurementsCreateInput, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

/**
 * Class responsible for handling CRUD for measurement data
 */
class MeasurementController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async index(req: Request, res: Response) {
    const farm_id = Number(req.query.farm_id);

    const farm = await this.prisma.farms.findOne({
      where: {
        id: farm_id,
      },
    });

    if (!farm) {
      return res.status(400).json({ error: res.__("Farm not found") });
    }

    const measurements = await this.prisma.measurements.findMany({
      where: {
        farm_id,
      },
      select: {
        water_amount: true,
        created_at: true,
      },
      orderBy: {
        created_at: "asc",
      },
    });

    return res.status(200).json(measurements);
  }

  async store(req: Request, res: Response) {
    const { farm_id, water_amount, created_at } = req.body;

    const farm = await this.prisma.farms.findOne({
      where: {
        id: farm_id,
      },
    });

    if (!farm) {
      return res.status(400).json({ error: res.__("Farm not found") });
    }

    const data: measurementsCreateInput = {
      water_amount,
      farms: {
        connect: {
          id: farm_id,
        },
      },
    };

    if (created_at != undefined) {
      data.created_at = created_at;
    }

    await this.prisma.measurements.create({
      data,
    });

    return res.sendStatus(200);
  }
}

export default new MeasurementController();
