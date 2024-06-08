import mongoose, { Schema } from "mongoose";

const BidSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    price: {
        type: Number,
        required: true,
    },
    isWinBid: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
    versionKey: false
})
const Bid = mongoose.model('Bid', BidSchema);
export default Bid

