import { Router } from 'express';
import { getStudies } from '../controllers/ctrl.studies.js';
const route = Router();
export const routeStudies = route.get('/studies', getStudies);