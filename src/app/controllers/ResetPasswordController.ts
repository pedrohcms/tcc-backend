import { Request, Response } from "express";
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
  async store(req: Request, res: Response) {
    const prisma = await Database.getInstance();

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

    await prisma.users.update({
      data: {
        password: hash("sha256", password),
      },
      where: {
        id: user.id,
      },
    });

    prisma.$disconnect();

    res.sendStatus(200);
  }
}

export default new ResetPasswordController();
