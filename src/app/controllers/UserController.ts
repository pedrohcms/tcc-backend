import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import uniqueEmailValidator from "../utils/uniqueEmailValidator";
import hash from "../utils/encryption";
import { profileValidator } from "../validators/profileValidator";

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

    const user = await this.prisma.users.findOne({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: res.__("User not found"),
      });
    }

    return res.status(200).json(user);
  }

  async store(req: Request, res: Response) {
    const { admin_id, name, email, password } = req.body;

    // CHECKING IF USER HAS PERMISSION
    if (!profileValidator(admin_id, 3)) {
      return res.sendStatus(403);
    }

    // MAKE EMAIL VALIDATION
    if (!(await uniqueEmailValidator(email))) {
      return res.status(400).json({
        error: res.__("Email already in use"),
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
        error: res.__("User not found"),
      });
    }

    const { name, email, password } = req.body;

    // If sent email is the same as the database email then skip this validation
    if (email !== user.email) {
      // Call email validation
      if (!(await uniqueEmailValidator(email))) {
        return res.status(400).json({
          error: res.__("Email already in use"),
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
