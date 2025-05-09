import { Router } from 'express';
import { getTrajectoryInfo } from '../controllers-pg/ctrl.trajectory.js';
const route = Router();

export const routeTrajectory = route.get('/trajectory', getTrajectoryInfo);