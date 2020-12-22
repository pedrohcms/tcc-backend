export interface IMeasureItem {
  sector: string;
  cultures: {
    name: string;
    ideal_moisture: number;
  };
  measurements: {
    water_amount: number;
    moisture: number;
    created_at: Date;
  }[];
}