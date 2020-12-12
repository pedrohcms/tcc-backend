import { Request, Response } from 'express';
import { Database } from '../classes/Database';
import { userProfileValidator } from '../validators/userProfileValidator';
import { userExistsValidator } from '../validators/userExistsValidator';
import { Profile } from '../classes/Profile';

/**
 * Class responsible for handling profile CRUD
 * 
 * @author Pedro Henrique Correa Mota da Silva
 */
class ProfileController {
  async index(req: Request, res: Response) {
    const email = String(req.query.email);
    
    // Checking if user exists
    const user = await userExistsValidator(email);
        
    if(!user) return res.status(400).json({ error: res.__("User not found") });

    // Retriving all profiles avaible
    const profiles = await Profile.getProfiles();

    return res.status(200).json({ user: { id: user.id, name: user.name, email: user.email, profileId: user.profile_id }, profiles });
  }

  async update(req: Request, res: Response) {    
    // Checking if user has thje necessary profile
    if (!(await userProfileValidator(Number(req.body.user_id), 3))) return res.sendStatus(403);

    const { userId, profileId } = req.body;
    
    // Checking if user exits
    const user = await userExistsValidator(userId);

    if(!user) return res.status(400).json({ error: res.__("User not found") });

    // Checking if profile exits
    const profile = await Profile.getProfile(profileId);

    if(!profile) return res.status(400).json({ error: res.__("Profile not found") });

    // Updating user's profile
    await Profile.updateUserProfile(userId, profileId);

    return res.sendStatus(200);
  }
}

export default new ProfileController();