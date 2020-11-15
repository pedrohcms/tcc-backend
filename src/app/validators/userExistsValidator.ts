import { Database } from "../classes/Database";

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
