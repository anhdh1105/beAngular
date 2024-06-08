import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
        category: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
        },
        discount: {
            type: Number,

        },
        countInStock: {
            type: Number,

        },
        isShow: {
            type: Boolean,
        },
        rating: {
            type: Number
        },
        startAt: {
            type: Date,
        },
        endAt: {
            type: Date,
        },
        // bids: {
        //     type: [Schema.Types.ObjectId],
        //     ref: "Bid",
        // },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
