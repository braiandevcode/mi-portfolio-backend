import { Router } from 'express';
import { getTrajectoryInfo } from '../controllers/ctrl.trajectory.js';
const route = Router();

export const routeTrajectory = route.get('/trajectory', getTrajectoryInfo);