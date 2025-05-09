import { Router } from 'express';
import { getProjects } from '../controllers/ctrl.project.js';
const route = Router();
export const routeProjects = route.get('/projects', getProjects);