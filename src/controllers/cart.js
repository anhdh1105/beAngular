import { StatusCodes } from 'http-status-codes';
import Cart from '../models/cart';
import Product from '../models/product';
import User from '../models/user';


export const getCartByUserId = async (req, res) => {
    // GET /cart/:userId
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        const cartData = {
            products: cart.products.map((item) => ({
                productId: item.productId._id,
                name: item.productId.name,
                image: item.productId.image,
                price: item.productId.price,
                quantity: item.quantity,
            }))
        };
        return res.status(StatusCodes.OK).json(cartData);
    } catch (error) {

    }
}

export const addItemToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    console.log("ahihih");
    try {
        //Kiem tra gio hang co ton tai chua ? Dua theo UserId
        let cart = await Cart.findOne({ userId });
        // neu gio hang khong ton tai thi chung ta tao moi
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }
        const existProductIndex = cart.products.findIndex((item) => item.productId.toString() == productId);
        //Kiem tra sp co ton tai trong gio hang ko ?
        if (existProductIndex !== -1) {
            //Neu ton tai trong gio hang thi cap nhat so luong
            cart.products[existProductIndex].quantity += quantity;
        } else {
            //Neu chua co thi them moi sp
            cart.products.push({ productId, quantity });
        }
        await cart.save();
        return res.status(StatusCodes.OK).json({ cart });
        //Luu gio hang
    } catch (error) {
        //Tra ve client loi
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" })
    }
}

export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found" });
        }
        cart.products = cart.products.filter((product) => product.productId != productId);
        await cart.save();
        return res.status(StatusCodes.OK).json({ cart });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
};

export const UpdateProductQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found" });
        }
        const product = cart.products.find((item) => item.productId == productId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
        }
        product.quantity = quantity;
        await cart.save();
        return res.status(StatusCodes.OK).json({ cart });
    }
    catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}


// Tăng số lượng của sản phẩm trong giỏ hàng
export const increaseProductQuantity = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const product = cart.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        product.quantity++;

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Giảm số lượng của sản phẩm trong giỏ hàng
export const decreaseProductQuantity = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const product = cart.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        if (product.quantity > 1) {
            product.quantity--;
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}