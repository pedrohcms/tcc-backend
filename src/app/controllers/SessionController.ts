import { PrismaClient } from "@prisma/client";
import hash from "../utils/encryption";
import { generateToken, verifyToken } from "../utils/jwt";
import { Request, Response } from "express";

/**
 * Class responsible for handling Login operation
 * @class SessionController
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
        token: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (user.password !== hash("sha256", password)) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    let token;

    // IF USER ALREADY HAS A TOKEN WHE TRY TO VALIDATE/GENERATE ONE AND SEND IT BACK
    if (user.token) {
      try {
        verifyToken(user.token);

        token = user.token;
      } catch (e) {
        token = generateToken(String(user.id));
      }
    } else {
      token = generateToken(String(user.id));
    }

    // UPDATING THE USER TOKEN
    await this.prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        token,
      },
    });

    return res.status(200).json({
      token,
    });
  }
}

export default new SessionController();
