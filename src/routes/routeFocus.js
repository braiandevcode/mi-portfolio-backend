import { Router } from 'express';
import { getFocusInfo } from '../controllers/ctrl.focus.js';
const route = Router();

export const routeFocus = route.get('/current', getFocusInfo);