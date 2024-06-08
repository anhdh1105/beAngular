import express from 'express';
import { create, delteProductById, getAll, getProductById, updateProductById } from '../controllers/product';
const router = express.Router();
router.get('/products', getAll);
router.get('/products/:id', getProductById);
// router.get('/products/search?query=', search);
//fe
router.post('/products/:id', delteProductById);
//be
router.delete('/products/:id', delteProductById);
router.patch('/products/:id', updateProductById);
router.post('/products', create);
export default router;