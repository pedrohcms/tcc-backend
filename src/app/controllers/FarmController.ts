import { Request, Response } from "express";
import { userProfileValidator } from "../validators/userProfileValidator";
import { userExistsValidator } from "../validators/userExistsValidator";
import { Database } from "../classes/Database";

/**
 * Class responsible for handling farm CRUD operations
 * 
 * @author Pedro Henrique Correa Mota da Silva
 */
class FarmController {
  async index(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    // CHECKING IF USER EXISTS
    const user = await userExistsValidator(req.body.user_id);

    if (!user) {
      return res.status(400).json({
        error: res.__("User not found"),
      });
    }

    // GETTING ALL THE FARMS A USER IS RELATED TO
    const farms = await prisma.farms.findMany({
      where: {
        user_farm: {
          some: {
            user_id: user.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        address: true,
      },
    });

    prisma.$disconnect();

    return res.status(200).json(farms);
  }

  async store(req: Request, res: Response) {
    const prisma = await Database.getInstance();

    const { user_id, name, address } = req.body;

    // CHECKING IF USER EXISTS
    const user = await userExistsValidator(user_id);

    if (!user) {
      return res.status(400).json({
        error: res.__("User not found"),
      });
    }

    // CHECKING IF USER HAS PROFILE
    if (!(await userProfileValidator(user.id, 3))) {
      return res.sendStatus(403);
    }

    // CHECKING IF ADDRESS ALREADY EXISTS
    let farm = await prisma.farms.findUnique({
      where: {
        address,
      },
    });

    if (farm) {
      return res.status(400).json({
        error: res.__("Address already in use"),
      });
    }

    farm = await prisma.farms.create({
      data: {
        name,
        address,
      },
    });

    await prisma.user_farm.create({
      data: {
        farms: {
          connect: {
            id: farm.id,
          }
        },
        users: {
          connect: {
            id: user.id
          }
        }
      }
    });

    prisma.$disconnect();

    return res.status(201).json(farm);
  }
}

export default new FarmController();
