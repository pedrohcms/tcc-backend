import { Database } from "./Database";

/**
 * Class responsible for handling farm configuration
 * 
 * @author Pedro Henrique Correa Mota da Silva
 */
export class FarmConfiguration {
  private engineType: string;
  private unityAmount: number;
  private unityPrice: number;

  constructor(engineType: string = 'eletrico', unityAmount: number = 0, unityPrice: number = 0) {
    this.engineType = engineType;
    this.unityAmount = unityAmount;
    this.unityPrice = unityPrice;
  }
  
  /**
   * Method responsible for getting the configuration values for a given farm
   */
  static async getFarmConfiguration(farmId: number) {
    const prisma = await Database.getInstance();

    const farm = await prisma.farms.findFirst({
      where: {
        id: farmId
      },
      select: {
        engine_type: true,
        unity_amount: true,
        unity_price: true,
      },
    });

    prisma.$disconnect();

    return new FarmConfiguration(String(farm?.engine_type), farm?.unity_amount, farm?.unity_price);
  }

  /**
   * Method responsible for updating the farm configuration values
   */
  static async updateFarmConfiguration(farmId: number, engineType: string, unityAmount: number, unityPrice: number) {
    const prisma = await Database.getInstance();

    const farm = await prisma.farms.update({
      where: {
        id: farmId
      },
      data: {
        engine_type: engineType,
        unity_amount: unityAmount,
        unity_price: unityPrice
      },
      select: {
        engine_type: true,
        unity_amount: true,
        unity_price: true
      }
    });

    prisma.$disconnect();

    return new FarmConfiguration(String(farm.engine_type), farm.unity_amount, farm.unity_price);
  }
}