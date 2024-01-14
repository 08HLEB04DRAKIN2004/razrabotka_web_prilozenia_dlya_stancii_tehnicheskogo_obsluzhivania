import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    const { data } = await axios.get('/services');
    return data;
});

export const fetchServicesById = createAsyncThunk('services/fetchServicesById', async (id) => {
    const { data } = await axios.get(`/services/${id}`);
    return data;
});

export const createService = createAsyncThunk('services/createService', async (serviceDate) => {
    const { data } = await axios.post('/services/create', serviceDate);
    return data;
});

export const updateService = createAsyncThunk('services/updateService', async ({ id, updatedData }) => {
    const { data } = await axios.patch(`/services/${id}/update`, updatedData);
    return data;
});

export const deleteService = createAsyncThunk('services/deleteService', async (id) => {
    await axios.delete(`/services/${id}/delete`);
    return id;
});

const initialState = {
    services: [],
    currentService: null,
    status: 'idle',
    error: null
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchServices.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchServices.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.services = action.payload;
        })
        .addCase(fetchServices.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchServicesById.pending, (state) => {
            state.currentService = null;
            state.status = 'loading';
        })
        .addCase(fetchServicesById.fulfilled, (state, action) => {
            state.currentService = action.payload;
            state.status = 'succeeded';
        })
        .addCase(fetchServicesById.rejected, (state, action) => {
            state.currentService = null;
            state.status = 'failed';
            state.error = action.error.message;
        })

        .addCase(createService.fulfilled, (state, action) => {
            state.services.push(action.payload);
        })
        .addCase(updateService.fulfilled, (state, action) => {
            const index = state.services.findIndex(service => service._id === action.payload._id);
            if (index !== -1) {
                state.services[index] = action.payload;
            }
        })
        .addCase(deleteService.fulfilled, (state, action) => {
            state.services = state.services.filter(service => service._id !== action.payload);
        });
    }
});

export const servicesReducer = servicesSlice.reducer;