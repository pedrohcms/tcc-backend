import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getFarmMeasures } from "../utils/getFarmMeasures";
import { addDays, startOfDay, endOfDay, subHours } from "date-fns";

class HomeController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async show(req: Request, res: Response) {
    const farm_id = Number(req.params.id);

    const farm = await this.prisma.farms.findOne({
      where: {
        id: farm_id,
      },
    });

    if (!farm) {
      return res.status(400).json({ error: res.__("Farm not found") });
    }

    const responseData: HomeResponseInterface = {
      todayMeasures: 0,
      lastTwelveHoursMeasures: 0,
      yesterdayMeasures: 0,
    };

    // RETRIVING INFORMATION FROM TODAY
    let date = new Date();

    responseData.todayMeasures = await getFarmMeasures(
      farm_id,
      startOfDay(date),
      endOfDay(date)
    );

    // RETRIVING INFORMATION FROM THE LAST 12 HOURS
    responseData.lastTwelveHoursMeasures = await getFarmMeasures(
      farm_id,
      subHours(date, 12),
      date
    );

    // RETRIVING INFORMATION FROM YESTERDAY
    date = addDays(date, -1);

    responseData.yesterdayMeasures = await getFarmMeasures(
      farm_id,
      startOfDay(date),
      endOfDay(date)
    );

    return res.status(200).json(responseData);
  }
}

export default new HomeController();
