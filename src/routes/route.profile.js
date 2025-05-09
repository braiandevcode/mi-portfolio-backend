import { Router } from 'express';
import { getProfileInfo } from '../controllers-pg/ctrl.profile.js';
const route = Router();

export const routeProfile = route.get('/profile', getProfileInfo);