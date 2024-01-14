import mongoose from "mongoose";

const OrderShema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }, 
        car: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'inProgress', 'completed', 'declined'] 
        },
        price: {
            type: Number,
        },
    },
    {
        timestamps: true,
    },
)

export default mongoose.model('Order', OrderShema);