import mongoose from "mongoose";

const PartsShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        available: {
            type: Boolean,
            required: true,
            default: false, 
        }
    },
    {
        timestamps: true,
    },
)

export default mongoose.model('Part', PartsShema);