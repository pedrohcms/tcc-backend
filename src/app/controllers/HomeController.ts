import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { addDays, startOfDay, endOfDay, subHours } from "date-fns";
import { Measure } from "../classes/Measure";
import { Database } from "../classes/Database";

class HomeController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = Database.getInstance();
  }

  async show(req: Request, res: Response) {
    const farmId = Number(req.params.id);

    const farm = await this.prisma.farms.findOne({
      where: {
        id: farmId,
      },
    });

    if (!farm) {
      this.prisma.$disconnect();
      return res.status(400).json({ error: res.__("Farm not found") });
    }

    const responseData = {
      todayMeasures: new Array<Measure>(),
      lastTwelveHoursMeasures: new Array<Measure>(),
      yesterdayMeasures: new Array<Measure>(),
    };    

    // RETRIVING INFORMATION FROM TODAY
    let date = new Date();

    let measures = await Measure.getMeasures(farmId, date, endOfDay(date));
    let summedMeasures = Measure.sumMeasures(measures);
    responseData.todayMeasures = summedMeasures;

    // RETRIVING INFORMATION FROM THE LAST 12 HOURS
    measures = await Measure.getMeasures(farmId, subHours(date, 12), date);
    summedMeasures = Measure.sumMeasures(measures);
    responseData.lastTwelveHoursMeasures = summedMeasures;
   
    // RETRIVING INFORMATION FROM YESTERDAY    
    date = addDays(date, -1);

    measures = await Measure.getMeasures(farmId, startOfDay(date), endOfDay(date));
    summedMeasures = Measure.sumMeasures(measures);
    responseData.yesterdayMeasures = summedMeasures;

    this.prisma.$disconnect();

    return res.status(200).json(responseData);
  }
}

export default new HomeController();
