import Bid from "../models/bid.js";
import Product from '../models/product.js';

const BidController = {
    getAll: async (req, res, next) => {
        try {
            const data = await Bid.find();
            if (data.length == 0) {
                // return res.status(400).json({ message: errorMessages.NOT_FOUND });
            }
            return res.status(200).json({
                // message: successMessages.GET_DATA_SUCCESS,
                data: data

            });
        } catch (error) {
            next(error);
        }
    },
    createBid: async (req, res, next) => {
        try {
            const data = await Bid.create(req.body);
            await Product.findByIdAndUpdate(req.body.product, {
                $push: { bids: data._id }
            });
            return res.status(201).json({
                // message: successMessages.GET_DATA_SUCCESS,
                data,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default BidController