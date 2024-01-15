import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createOrder } from '../redux/slices/orders';

const OrderForm = () => {
    const dispatch = useDispatch();
    const [orderData, setOrderData] = useState({
        car: '',
        description: '',
        status: 'pending',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createOrder({ ...orderData, price: 0 }));
        setOrderData({ car: '', description: '', status: 'pending' });
    };

    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                required
                fullWidth
                id="car"
                label="Марка, модель, год"
                name="car"
                value={orderData.car}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                required
                fullWidth
                multiline
                rows={4}
                id="description"
                label="Описание проблемы"
                name="description"
                value={orderData.description}
                onChange={handleChange}
                margin="normal"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Создать заказ
            </Button>
        </Box>
    );
};

export default OrderForm;