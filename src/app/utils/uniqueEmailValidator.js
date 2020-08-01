const prisma = require("@prisma/client");
const { PrismaClient } = require("@prisma/client");

/**
 * Given a email return true if email is unique or false if already in use.
 * @function uniqueEmailValidator
 *
 * @param {String} email
 *
 * @returns Boolean
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
module.exports = async (email) => {
  const prisma = new PrismaClient();

  const found = await prisma.users.findOne({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });

  if (!found) {
    return true;
  }

  return false;
};
