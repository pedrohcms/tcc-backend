import { Database } from "./Database";

export class Profile {
  private id: number;
  private name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }


  /**
  * Method responsible for returning the profile by Id
  */
  static async getProfile(profileId: number) {
    const prisma = await Database.getInstance();

    const profile = await prisma.profiles.findOne({
      where: {
        id: profileId
      },
      select: {
        id: true,
        profile_name: true,
      }
    });

    prisma.$disconnect();

    if(!profile) return false;

    return new Profile(profile.id, profile.profile_name);
  }

  /**
   * Method responsible for getting all profiles
   */
  static async getProfiles() {
    const prisma = await Database.getInstance();

    const profiles = await prisma.profiles.findMany({
      select:{
        id: true,
        profile_name: true,
      },
      orderBy: {
        id: 'asc'
      }
    });

    const returnedProfiles: Profile[] = [];

    profiles.map((profile) => {
      returnedProfiles.push(new Profile(profile.id, profile.profile_name));
    });

    prisma.$disconnect();

    return returnedProfiles;
  }

  /**
   * Method responsible for updating the user profile
   */
  static async updateUserProfile(userId: number, profileId: number) {
    const prisma = await Database.getInstance();

    // UPDATE THE USER PROFILE
    await prisma.users.update({
      data: {
        profiles: {
          connect: {
            id: profileId
          }
        }
      },
      where: {
        id: userId
      }
    });

    prisma.$disconnect();
  }
}