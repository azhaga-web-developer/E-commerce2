import express from 'express';
import { createOrder, getOrders, getOrderById, getAdminOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/admin/all', authorize('admin'), getAdminOrders);
router.patch('/admin/:id/status', authorize('admin'), updateOrderStatus);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);

export default router;
