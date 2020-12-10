import { differenceInHours } from "date-fns";
import { Database } from "./Database";

/**
 * Class responsible for handling engine operations
 * 
 * @author Pedro Henrique Correa Mota da Silva
 */
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

  /**
   * Method responsible for calculating the amount of resources consumed by the engine and the total price of that
   */
  static async calculateEngineOperation(farmId: number, startDateTime: Date, endDateTime: Date) {
    const prisma = await Database.getInstance();

    const results: IEngineOperationCalculation = {
      totalPrice: 0,
      totalAmount: 0,
      engineType: 'eletrico',
      hoursAmount: 0,
      unityAmount: 0,
      unityPrice: 0,
    };

    // Retrieving the calculation parameters
    const params = await prisma.farms.findFirst({
      where: {
        id: farmId
      },
      select: {
        unity_amount: true,
        unity_price: true,
        engine_type: true,
      }
    });

    // If params are not defined we return the result
    if(params!.unity_amount == 0 || params!.unity_price == 0) {
      prisma.$disconnect();
      return results;
    }

    results.unityAmount = params!.unity_amount;
    results.unityPrice  = params!.unity_price;

    // Recovering engine operating intervals
    const engineOperations = await prisma.engine_operation.findMany({
      select: {
        start_date_time: true,
        end_date_time: true,
      },
      where: {
        farm_id: farmId,
        start_date_time: {
          gte: startDateTime,
          lte: endDateTime
        },
      }
    });

    // If no operation was found we return the result.
    if(engineOperations.length == 0) {
      prisma.$disconnect();
      return results;
    }    

    prisma.$disconnect();

    let hoursAmount: number = 0;

    // Calculate the total amount of hours the engine operated
    engineOperations.forEach((item) => {      
      hoursAmount += differenceInHours(item.end_date_time, item.start_date_time);
    });

    // Format and convert the number
    results.totalAmount = Number((hoursAmount * params!.unity_amount).toFixed(2));
    results.totalPrice  = Number((hoursAmount * params!.unity_price * params!.unity_amount).toFixed(2));
    results.hoursAmount = hoursAmount;
        
    return results;
  }
}