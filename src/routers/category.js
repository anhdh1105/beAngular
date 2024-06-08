import express from 'express';
import { create, delteCategoryById, getAll, getCategoryById, updateCategoryById } from '../controllers/category';
const router = express.Router();
router.get('/categories', getAll);
router.get('/categories/:id', getCategoryById);
router.delete('/categories/:id', delteCategoryById);
router.patch('/categories/:id', updateCategoryById);
router.post('/categories', create);
export default router;