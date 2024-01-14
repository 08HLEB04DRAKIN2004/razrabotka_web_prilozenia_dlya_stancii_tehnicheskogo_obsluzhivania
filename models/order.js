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
            enum: ['pending', 'inProgress', 'complitet', 'declined'] 
        },
        price: {
            type: Number,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

export default mongoose.model('Order', OrderShema);