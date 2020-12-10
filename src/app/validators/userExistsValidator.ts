import { Database } from "../classes/Database";

/**
 * Verify if a user exists using his id or email
 * 
 * @author Pedro Henrique Correa Mota da Silva
 */
export async function userExistsValidator(id: string) {
  const re = RegExp("[a-zA-Z]+");

  const prisma = await Database.getInstance();

  let user;

  if (re.test(id)) {
    user = await prisma.users.findOne({
      where: {
        email: id,
      },
    });
  } else {
    user = await prisma.users.findOne({
      where: {
        id: Number(id),
      },
    });
  }

  prisma.$disconnect();

  return user;
}
