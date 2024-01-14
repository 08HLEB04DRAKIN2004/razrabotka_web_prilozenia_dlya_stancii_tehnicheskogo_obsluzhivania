import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchParts = createAsyncThunk('parts/fetchParts', async () => {
    const { data } = await axios.get('/parts');
    return data;
});

export const fetchPartsById = createAsyncThunk('parts/fetchPartsById', async (id) => {
    const { data } = await axios.get(`/parts/${id}`);
    return data;
});

export const createPart = createAsyncThunk('parts/createPart', async (partData) => {
    const { data } = await axios.post('/parts/create', partData);
    return data;
});

export const updatePart = createAsyncThunk('parts/updatePart', async ({ id, updatedData }) => {
    const { data } = await axios.patch(`/parts/${id}/update`, updatedData);
    return data;
});

export const deletePart = createAsyncThunk('parts/deletePart', async (id) => {
    await axios.delete(`/parts/${id}/delete`);
    return id;
});

const initialState = {
    parts: [],
    currentPart: null,
    status: 'idle',
    error: null
};

const partsSlice = createSlice({
    name: 'parts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchParts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchParts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.parts = action.payload;
        })
        .addCase(fetchParts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchPartsById.pending, (state) => {
            state.currentPart = null;
            state.status = 'loading';
        })
        .addCase(fetchPartsById.fulfilled, (state, action) => {
            state.currentPart = action.payload;
            state.status = 'succeeded';
        })
        .addCase(fetchPartsById.rejected, (state, action) => {
            state.currentPart = null;
            state.status = 'failed';
            state.error = action.error.message;
        })

        .addCase(createPart.fulfilled, (state, action) => {
            state.parts.push(action.payload);
        })
        .addCase(updatePart.fulfilled, (state, action) => {
            const index = state.parts.findIndex(part => part._id === action.payload._id);
            if (index !== -1) {
                state.parts[index] = action.payload;
            }
        })
        .addCase(deletePart.fulfilled, (state, action) => {
            state.parts = state.parts.filter(part => part._id !== action.payload);
        });
    }
});

export const partsReducer = partsSlice.reducer;