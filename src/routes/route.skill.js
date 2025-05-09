import { Router } from 'express';
import { getSkills } from '../controllers-pg/ctrl.skill.js';
const route = Router();

export const routeSkills = route.get('/skills', getSkills);
