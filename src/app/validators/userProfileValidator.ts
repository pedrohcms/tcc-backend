import { Database } from "../classes/Database";

/**
 * Given a user id, return true if the user has the correct profile or false if not
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
export async function userProfileValidator(
  userId: number,
  requiredProfile: number
) {
  const prisma = await Database.getInstance();

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
