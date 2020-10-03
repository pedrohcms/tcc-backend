import { PrismaClient } from "@prisma/client";

export async function userExistsValidator(id: string) {
  const re = RegExp("[a-zA-Z]+");

  const prisma = new PrismaClient();

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

  return user;
}
