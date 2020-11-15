import hash from "../utils/encryption";
import { generateToken, verifyToken } from "../utils/jwt";
import { Request, Response } from "express";
import { userExistsValidator } from "../validators/userExistsValidator";
import { Database } from "../classes/Database";

/**
 * Class responsible for handling Login operation
 * @class SessionController
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
class SessionController {
  /**
   * This method create the JWT token if information is valid
   *
   * @author Pedro Henrique Correa Mota da Silva
   */
  async store(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    const { email, password } = req.body;

    const user = await userExistsValidator(email);
    
    if (!user) {
      return res.status(400).json({
        error: res.__("User not found"),
      });
    }

    if (user.password !== hash("sha256", password)) {
      return res.status(400).json({
        error: res.__("Invalid password"),
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
    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        token,
      },
    });
    
    prisma.$disconnect();

    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        profile: user.profile_id,
        token
      },     
    });
  }
}

export default new SessionController();
