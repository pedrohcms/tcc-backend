import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { profileValidator } from "../validators/profileValidator";

/**
 * Class responsible for handling farm CRUD operations
 * @class FarmController
 */
class FarmController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async store(req: Request, res: Response) {
    const { user_id, name, address } = req.body;

    // CHECKING IF USER HAS PERMISSION
    if (!profileValidator(Number(user_id), 3)) {
      return res.sendStatus(403);
    }

    // CHECKING IF ADDRESS ALREADY EXISTS
    let farm = await this.prisma.farms.findOne({
      where: {
        address,
      },
    });

    if (farm) {
      return res.status(400).json({
        error: res.__("Address already in use"),
      });
    }

    farm = await this.prisma.farms.create({
      data: {
        name,
        address,
      },
    });

    return res.status(201).json(farm);
  }
}

export default new FarmController();
