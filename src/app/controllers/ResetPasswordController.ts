import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import hash from "../utils/encryption";

class ResetPasswordController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async show(req: Request, res: Response) {
    const name = req.query.name;
    const email = String(req.query.email);

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

    if (user.name !== name) {
      return res.status(400).json({
        error: "Wrong name",
      });
    }

    return res.sendStatus(200);
  }

  async store(req: Request, res: Response) {
    const { email } = req.params;
    const { password } = req.body;

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
