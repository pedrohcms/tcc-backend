import { PrismaClient } from "@prisma/client";

// GIVEN A USER ID RETURN TRUE IF THE USER HAS THE RIGHT PROFILE OR FALSE IF
export async function profileValidator(
  userId: number,
  requiredProfile: number
) {
  const prisma = new PrismaClient();

  const user = await prisma.users.findOne({
    where: {
      id: userId,
    },
    select: {
      profile_id: true,
    },
  });

  prisma.$disconnect();

  if (requiredProfile > (user?.profile_id ?? 1)) {
    return false;
  }

  return true;
}
