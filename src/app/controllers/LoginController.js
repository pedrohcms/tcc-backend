const { PrismaClient } = require("@prisma/client");
const { hash } = require("../utils/encryption");
const { generateToken } = require("../utils/jwt");

/**
 * Class responsible for handling Login operation
 * @class LoginController
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
class LoginController {
  /**
   * @constructor
   */
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * This method create the JWT token if information is valid
   * @method store
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @author Pedro Henrique Correa Mota da Silva
   */
  async store(req, res) {
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

    if (user.password !== hash("sha256", password, "hex")) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      token,
    });
  }
}

module.exports = new LoginController();
