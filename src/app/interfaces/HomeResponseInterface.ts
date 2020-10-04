export interface HomeResponseInterface {
  todayMeasures: number | { water_amount: number }[];
  lastTwelveHoursMeasures: number | { water_amount: number }[];
  yesterdayMeasures: number | { water_amount: number }[];
}
