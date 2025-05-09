import { Router } from 'express';
const route = Router();
import { getSkills } from '../controllers/ctrl.skill.js';

export const routeSkills = route.get('/skills', getSkills);
