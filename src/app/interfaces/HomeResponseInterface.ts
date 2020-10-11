import { MeasureInterface } from "./MeasureInterface";

export interface HomeResponseInterface {
  todayMeasures: MeasureInterface;
  lastTwelveHoursMeasures: MeasureInterface;
  yesterdayMeasures: MeasureInterface;
}
