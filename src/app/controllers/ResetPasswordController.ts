import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import hash from "../utils/encryption";

/**
 * Class responsible for handling password reset operations
 * @class ResetPasswordController
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
class ResetPasswordController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async store(req: Request, res: Response) {
    const email = String(req.params.email);
    const { password, confirm_password } = req.body;

    const user = await this.prisma.users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (password != confirm_password) {
      return res.status(400).json({
        error: "Password values does not match",
      });
    }

    this.prisma.users.update({
      data: {
        password: hash("sha256", password),
      },
      where: {
        email,
      },
    });

    res.sendStatus(200);
  }
}

export default new ResetPasswordController();
