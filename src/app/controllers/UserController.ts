import { Request, Response } from "express";
import uniqueEmailValidator from "../utils/uniqueEmailValidator";
import hash from "../utils/encryption";
import { profileValidator } from "../validators/profileValidator";
import { userExistsValidator } from "../validators/userExistsValidator";
import { Database } from "../classes/Database";

/**
 * Class responsible for handling User CRUD
 * 
 * @class UserController
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
class UserController {
  async show(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    const user = await userExistsValidator(req.params.id);

    if (!user) {
      return res.status(400).json({
        error: res.__("User not found"),
      });
    }

    prisma.$disconnect();

    return res.status(200).json(user);
  }

  async store(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    const { user_id, name, email, password } = req.body;

    // CHECKING IF USER HAS PERMISSION
    if (!(await profileValidator(Number(user_id), 3))) {
      return res.sendStatus(403);
    }

    // MAKE EMAIL VALIDATION
    if (!(await uniqueEmailValidator(email))) {
      return res.status(400).json({
        error: res.__("Email already in use"),
      });
    }

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hash("sha256", password),
      },
    });

    prisma.$disconnect();

    return res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    let user = await userExistsValidator(req.params.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        error: res.__("User not found"),
      });
    }

    // CHECKING IF USER HAS PERMISSION
    if (!(await profileValidator(Number(req.body.user_id), 3))) {
      return res.sendStatus(403);
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

    user = await prisma.users.update({
      data: {
        name,
        email,
        password: hash("sha256", password),
      },
      where: {
        id: user.id,
      },
    });

    prisma.$disconnect();

    return res.status(200).json(user);
  }
}

export default new UserController;
