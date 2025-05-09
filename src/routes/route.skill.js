import { getSkills } from '../controllers/ctrl.skill.js';
import { Router } from 'express';
const route = Router();

export const routeSkills = route.get('/skills', getSkills);
