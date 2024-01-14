import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const createReview = createAsyncThunk(
    'reviews/createReview',
    async ({ orderId, reviewData }) => {
        const { data } = await axios.post(`/reviews/${orderId}/create`, reviewData);
        return data;
    }
);

export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async (reviewId) => {
        await axios.delete(`/reviews/${reviewId}/delete`);
        return reviewId;
    }
);

export const updateReview = createAsyncThunk(
    'reviews/updateReview',
    async ({ reviewId, updatedData }) => {
        const { data } = await axios.patch(`/reviews/${reviewId}/update`, updatedData);
        return data;
    }
);

export const fetchAllReviews = createAsyncThunk(
    'reviews/fetchAllReviews',
    async () => {
        const { data } = await axios.get('/reviews');
        return data;
    }
);

const initialState = {
    reviews: [],
    status: 'idle',
    error: null
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload);
                state.status = 'succeeded';
            })
            .addCase(createReview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(deleteReview.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter(review => review._id !== action.payload);
                state.status = 'succeeded';
            })

            .addCase(updateReview.fulfilled, (state, action) => {
                const index = state.reviews.findIndex(review => review._id === action.payload._id);
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                }
                state.status = 'succeeded';
            })

            .addCase(fetchAllReviews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllReviews.fulfilled, (state, action) => {
                state.reviews = action.payload;
                state.status
                    = 'succeeded';
            })
            .addCase(fetchAllReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const reviewsReducer = reviewsSlice.reducer;