import { Router } from 'express';
import { getProjects } from '../controllers-pg/ctrl.project.js';
const route = Router();

export const routeProjects = route.get('/projects', getProjects);