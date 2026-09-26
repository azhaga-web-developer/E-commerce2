import express from 'express';
import { getDashboardSummary } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/dashboard', protect, authorize('admin'), getDashboardSummary);

export default router;
