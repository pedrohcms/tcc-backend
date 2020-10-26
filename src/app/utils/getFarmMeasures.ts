import { PrismaClient, SortOrder } from "@prisma/client";
import { format, addDays, startOfDay } from "date-fns";

export const getFarmMeasures = async (
  farmId: number,
  startDate: Date,
  endDate: Date,
  orderBy: string,
  queryType: string
) => {  
  startDate = startOfDay(startDate);

  const prisma = new PrismaClient();

  let choosenOrderBy;

  // CREATING THE ORDER BY OPTION
  switch (orderBy) {
    case "null":
    case "undefined":
    case "asc":
      choosenOrderBy = SortOrder.asc;
      break;
    case "desc":
      choosenOrderBy = SortOrder.desc;
      break;
  }

  // CREATING THE QUERY TYPE OPTION
  queryType =
    queryType == "undefined" || queryType == "null"
      ? queryTypeEnum.GROUP
      : queryType;

  let measures;

  switch (queryType) {
    case queryTypeEnum.LIST:
      measures = await prisma.measurements.findMany({
        select: {
          created_at: true,
          water_amount: true,
        },
        orderBy: {
          created_at: choosenOrderBy,
        },
        where: {
          farm_id: farmId,
          created_at: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      break;
    case queryTypeEnum.SUM:
      measures = await prisma.measurements.aggregate({
        sum: {
          water_amount: true,
        },
        orderBy: {
          created_at: choosenOrderBy,
        },
        where: {
          farm_id: farmId,
          created_at: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      measures = {
        start_date: startDate,
        end_date: endDate,
        sum: measures.sum.water_amount ?? 0,
      };

      break;

    case queryTypeEnum.GROUP:
      let query = `SELECT 
                      A.created_at AS start_date, 
                      SUM(A.water_amount) 
                    FROM measurements A INNER JOIN farms B ON 
                      A.farm_id = B.id
                    WHERE B.id = ${farmId}
                      AND A.created_at::DATE >= '${format(
                        startDate,
                        "y-MM-dd"
                      )}'
                      AND A.created_at::DATE <= '${format(endDate, "y-MM-dd")}'
                    GROUP BY A.created_at 
                    ORDER BY A.created_at::DATE ${choosenOrderBy};`;

      measures = await prisma.$queryRaw(query);
      break;
  }

  prisma.$disconnect();

  return measures;
};

export enum queryTypeEnum {
  SUM = "SUM",
  GROUP = "GROUP",
  LIST = "LIST",
}
