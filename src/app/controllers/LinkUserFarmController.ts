import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { profileValidator } from "../validators/profileValidator";
import { userExistsValidator } from "../validators/userExistsValidator";

class LinkUserFarmController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async index(req: Request, res: Response) {
    const farm_id = Number(req.query.farm_id);

    const farm = await this.prisma.farms.findOne({
      where: {
        id: farm_id,
      },
    });

    // VALIDATING IF FARM EXISTS
    if (!farm) return res.status(400).json({ error: res.__("Farm not found") });

    // QUERYING FOR THE USERS RELATED TO THAT FARM
    const users = await this.prisma.users.findMany({
      where: {
        user_farm: {
          some: {
            farm_id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.status(200).json(users);
  }

  async store(req: Request, res: Response) {
    const { user_id, email, address } = req.body;

    // CHECKING IF USER HAS PERMISSION
    if (!(await profileValidator(Number(user_id), 2)))
      return res.sendStatus(403);

    const user = await userExistsValidator(email);

    // VALIDANTING USER EXISTS
    if (!user) return res.status(400).json({ error: res.__("User not found") });

    // SEARCHING FOR FARM AND TRYING TO BRING THE USER TOO
    const farm = await this.prisma.farms.findOne({
      where: {
        address,
      },
      include: {
        user_farm: {
          where: {
            users: {
              id: user.id,
            },
          },
        },
      },
    });

    // VALIDATING IF FARM EXISTS
    if (!farm) return res.status(400).json({ error: res.__("Farm not found") });

    // CHECKING IF USER IS ALREADY LINKED TO THE FARM
    if (farm.user_farm.length > 0) return res.sendStatus(201);

    await this.prisma.user_farm.create({
      data: {
        farms: {
          connect: {
            address,
          },
        },
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return res.sendStatus(201);
  }

  async destroy(req: Request, res: Response) {
    let { user_id, address } = req.query;

    user_id = String(user_id);
    address = String(address);

    const user = await userExistsValidator(user_id);

    if (!user) return res.status(400).json({ error: res.__("User not found") });

    const farm = await this.prisma.farms.findOne({
      where: {
        address,
      },
      include: {
        user_farm: {
          where: {
            user_id: user.id,
          },
        },
      },
    });

    if (!farm) return res.status(400).json({ error: res.__("Farm not found") });

    await this.prisma.user_farm.deleteMany({
      where: {
        AND: {
          user_id: Number(user_id),
          farm_id: farm.id,
        },
      },
    });

    return res.sendStatus(200);
  }
}

export default new LinkUserFarmController();
