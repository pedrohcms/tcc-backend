import { startOfDay } from "date-fns";
import { Database } from "./Database";
import { IMeasureItem } from '../interfaces/IMeasureItem';

/**
 * Class responsible for handling meaures
 * 
 * @author Pedro Henrique Correa Mota da Silva
 */
export class Measure {
  private sector: string | null;
  private idealMoisture: number | null;
  private culture: string | null;
  private measures: Array<{ waterAmount: number, moisture: number, createdAt: Date | null }>

  constructor(props: { sector: string | null, ideal_moisture: number | null, culture: string | null, measures: Array<{ water_amount: number, moisture: number, created_at: Date | null }> }) {
    this.sector = props.sector;
    this.idealMoisture = props.ideal_moisture;
    this.culture = props.culture;

    this.measures = [];

    props.measures.forEach((measure) => {
      this.measures.push({ waterAmount: measure.water_amount, moisture: measure.moisture, createdAt: measure.created_at });
    })
  }

  /**
   * METHOD TO GET ALL MEASURES FROM A FARM
   */
  static async getMeasures(farmId: number, startDate: Date, endDate: Date) {
    startDate = startOfDay(startDate);

    const prisma = await Database.getInstance();

    const measures = await prisma.farm_culture.findMany({
      select: {
        sector: true,
        cultures: {
          select: {
            name: true,
            ideal_moisture: true,
          }
        },
        measurements: {
          select: {
            water_amount: true,
            moisture: true,
            created_at: true,
          },
          orderBy: {
            created_at: "asc",
          },
        }
      },
      where: {
        farms: {
          id: farmId
        },
      }
    });

    prisma.$disconnect();

    measures.forEach((measure: IMeasureItem) => {
      measure.measurements = measure.measurements.filter(element => {
        if(element.created_at >= startDate && element.created_at <= endDate)
          return true;
      });
    });

    let convertedMeasures: Array<Measure> = [];
    
    measures.forEach((measure: IMeasureItem) => {
      convertedMeasures.push(new Measure({ sector: measure.sector, culture: measure.cultures.name, ideal_moisture: measure.cultures.ideal_moisture, measures: measure.measurements }));
    });    
    
    return convertedMeasures;
  }

  /**
   * METHOD SUM ALL MEASURES OF A FARM
   */
  static sumMeasures(measurements: Array<Measure>) {
    let summedMeasures = new Array<Measure>();

    let waterAmount = 0;
    let moisture = 0;
    
    measurements.forEach((measures) => {
      measures.measures.forEach(measure => {
        waterAmount += measure.waterAmount;
        moisture += measure.moisture;
      });
    });
    
    summedMeasures.push(new Measure({ sector: null, culture: null, ideal_moisture: null, measures: [{ water_amount: waterAmount, moisture, created_at: null }] }));

    return summedMeasures;
  }
}