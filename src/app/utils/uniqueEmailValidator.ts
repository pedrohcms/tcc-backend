import { Database } from "../classes/Database";

/**
 * Given a email return true if email is unique or false if already in use.
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
export default async (email: string) => {
  const prisma = await Database.getInstance();

  const found = await prisma.users.findOne({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });

  prisma.$disconnect();

  if (!found) {
    return true;
  }

  return false;
};
