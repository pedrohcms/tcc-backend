import { Database } from "./Database";

export class EngineOperation {
  private farmId: number;
  private startDateTime: Date;
  private endDateTime: Date;

  constructor(farmId: number, startDateTime: Date, endDateTime: Date) {
    this.farmId = farmId;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
  }

  /**
   * Method responsible for creating a new engine operation register in the database
   * @param farmId number
   * @param startDateTime Date
   * @param endDateTime Date
   */
  static async createEngineOperation(farmId: number, startDateTime: Date, endDateTime: Date) {
    const prisma = await Database.getInstance();
   
    const engineOperation = await prisma.engine_operation.create({
      data: {
        farms: {
          connect: {
            id: farmId
          }
        },
        start_date_time: startDateTime,
        end_date_time: endDateTime,
      }
    });

    prisma.$disconnect();

    return new EngineOperation(engineOperation.farm_id, engineOperation.start_date_time, engineOperation.end_date_time);
  }
}

