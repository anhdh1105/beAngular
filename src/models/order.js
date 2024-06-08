import mongoose, { Schema } from "mongoose";


// const generateOrderNumber = () => {
//     const timestamps = Data.now().toString();
//     const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
//     return `${timestamps}-${random}`;
// }
const OderItemSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     auto: true,
    // },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

//Order

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        required: true,
    },
    items: [OderItemSchema],
    orderNumber: {
        type: String,
        auto: true,
        unique: true
    },
    customerInfo: {
        type: {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: Number
            },
            payment: {
                type: String,
            },
            city: {
                type: String
            }
        },
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
},
    { timestamps: true, versionKey: false }

);

//Sinh order number
// OrderSchema.pre('save', function (next) {
//     if (!this.orderNumber) {
//         this.orderNumber = generateOrderNumber();
//     }
//     next();
// })
export default mongoose.model('Order', OrderSchema)