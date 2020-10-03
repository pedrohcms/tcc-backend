import { PrismaClient } from "@prisma/client";

export const getFarmMeasures = async (
  farmId: number,
  initialDate: Date,
  endDate: Date = new Date(),
  orderBy: "asc" | "desc" = "asc",
  sum: boolean = true
) => {
  const prisma = new PrismaClient();

  let measures;

  if (!sum) {
    measures = await prisma.measurements.findMany({
      select: {
        water_amount: true,
      },
      orderBy: {
        created_at: orderBy,
      },
      where: {
        farm_id: farmId,
        created_at: {
          gte: initialDate,
          lte: endDate,
        },
      },
    });

    return measures;
  }

  measures = await prisma.measurements.aggregate({
    sum: {
      water_amount: true,
    },
    orderBy: {
      created_at: orderBy,
    },
    where: {
      farm_id: farmId,
      created_at: {
        gte: initialDate,
        lte: endDate,
      },
    },
  });

  return measures.sum.water_amount;
};
