import { Router } from "express";
import { UpdateProductQuantity, addItemToCart, decreaseProductQuantity, getCartByUserId, increaseProductQuantity, removeFromCart } from "../controllers/cart";

const router = Router();

router.post('/cart/add-to-cart', addItemToCart);
router.get('/cart/:userId', getCartByUserId);
router.post('/cart/remove-cart', removeFromCart);
router.put('/cart/update-product-quantity', UpdateProductQuantity);
router.post('/cart/increase', increaseProductQuantity);
router.post('/cart/decrease', decreaseProductQuantity);

export default router;