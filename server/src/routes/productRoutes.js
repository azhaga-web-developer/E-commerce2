import express from 'express';
import { getProducts, getProductById, createProduct, getAdminProducts, deleteProduct } from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/admin/all', protect, authorize('admin'), getAdminProducts);
router.delete('/:id', protect, authorize('admin'), deleteProduct);
router.get('/:id', getProductById);
router.post('/', protect, authorize('admin'), createProduct);

export default router;
