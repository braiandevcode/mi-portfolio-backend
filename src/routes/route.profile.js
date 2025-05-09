import { getProfileInfo} from '../controllers/ctrl.profile.js';
import { Router } from 'express';
const route = Router();

export const routeProfile = route.get('/profile', getProfileInfo);