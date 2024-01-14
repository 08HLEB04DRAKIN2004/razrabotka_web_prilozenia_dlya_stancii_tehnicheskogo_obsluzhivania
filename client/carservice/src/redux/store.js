import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { partsReducer } from './slices/parts';
import { servicesReducer } from './slices/services';
import { employeesReducer } from './slices/employees';
import { ordersReducer } from './slices/orders';
import { reviewsReducer } from './slices/reviews';

const store = configureStore({
    reducer: {
        auth: authReducer,
        parts: partsReducer,
        orders: ordersReducer,
        reviews: reviewsReducer,
        services: servicesReducer,
        employees: employeesReducer,
    }
});

export default store;