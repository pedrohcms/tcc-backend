import { PrismaClient } from "@prisma/client";
import hash from "../utils/encryption";
import generateToken from "../utils/jwt";
import { Request, Response } from "express";

/**
 * Class responsible for handling Login operation
 * @class LoginController
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
class SessionController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  /**
   * This method create the JWT token if information is valid
   *
   * @author Pedro Henrique Correa Mota da Silva
   */
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.prisma.users.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (user.password !== hash("sha256", password)) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    const token = generateToken(String(user.id));

    return res.status(200).json({
      token,
    });
  }
}

export default new SessionController();
