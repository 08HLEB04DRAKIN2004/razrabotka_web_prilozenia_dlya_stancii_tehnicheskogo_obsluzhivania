import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/slices/orders';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

const OrdersPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);
    const loading = useSelector(state => state.orders.status) === 'loading';

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Заказы
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="orders table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID заказа</TableCell>
                            <TableCell align="right">Пользователь</TableCell>
                            <TableCell align="right">Авто</TableCell>
                            <TableCell align="right">Описание</TableCell>
                            <TableCell align="right">Цена</TableCell>
                            <TableCell align="right">Статус</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell component="th" scope="row">
                                    {order._id}
                                </TableCell>
                                <TableCell align="right">{order.user ? order.user.userName : 'Неизвестный'}</TableCell>
                                <TableCell align="right">{order.car}</TableCell>
                                <TableCell align="right">{order.description}</TableCell>
                                <TableCell align="right">${order.price}</TableCell>
                                <TableCell align="right">
                                    <Chip
                                        label={order.status}
                                        color={order.status === 'completed' ? 'success' : 'default'}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default OrdersPage;
