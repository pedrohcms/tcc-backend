import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import uniqueEmailValidator from "../utils/uniqueEmailValidator";
import hash from "../utils/encryption";

/**
 * Class responsible for handling User CRUD
 * @class UserController
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
class UserController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async show(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        error: "Missing id",
      });
    }

    const user = await this.prisma.users.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json(user);
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    // Call email validation
    if (!(await uniqueEmailValidator(email))) {
      return res.status(400).json({
        error: "Email already in use",
      });
    }

    const user = await this.prisma.users.create({
      data: {
        name,
        email,
        password: hash("sha256", password),
      },
    });

    return res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    let user = await this.prisma.users.findOne({
      where: {
        id,
      },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const { name, email, password } = req.body;

    // If sent email is the same as the database email then skip this validation
    if (email !== user.email) {
      // Call email validation
      if (!(await uniqueEmailValidator(email))) {
        return res.status(400).json({
          error: "Email already in use",
        });
      }
    }

    user = await this.prisma.users.update({
      data: {
        name,
        email,
        password: hash("sha256", password),
      },
      where: {
        id,
      },
    });

    return res.status(200).json(user);
  }
}

export default new UserController();
