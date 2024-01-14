import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }, 
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Review', ReviewSchema);