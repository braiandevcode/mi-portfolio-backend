import { Router } from 'express';
import { getStudiesModel } from '../models/model-pg/model.studies.js';
const route = Router();

export const routeStudies = route.get('/studies', getStudiesModel);