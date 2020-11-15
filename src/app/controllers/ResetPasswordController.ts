import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import hash from "../utils/encryption";
import { userExistsValidator } from "../validators/userExistsValidator";
import { Database } from "../classes/Database";

/**
 * Class responsible for handling password reset operations
 * @class ResetPasswordController
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
class ResetPasswordController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = Database.getInstance();
  }

  async store(req: Request, res: Response) {
    const { password, confirm_password } = req.body;

    const user = await userExistsValidator(req.params.email);

    if (!user) {
      return res.status(400).json({
        error: res.__("User not found"),
      });
    }

    if (password != confirm_password) {
      return res.status(400).json({
        error: res.__("Password values does not match"),
      });
    }

    await this.prisma.users.update({
      data: {
        password: hash("sha256", password),
      },
      where: {
        id: user.id,
      },
    });

    this.prisma.$disconnect();

    res.sendStatus(200);
  }
}

export default new ResetPasswordController();
