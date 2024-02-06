import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrder } from '../redux/slices/orders';
import { Dialog, DialogTitle, DialogContent, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem, Button, DialogActions } from '@mui/material';

const OrdersPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);
    const loading = useSelector(state => state.orders.status) === 'loading';
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchPhone, setSearchPhone] = useState('');
    const [searchCar, setSearchCar] = useState('');
    const [sortPrice, setSortPrice] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editPrice, setEditPrice] = useState('');
    const [editStatus, setEditStatus] = useState('');

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    useEffect(() => {
        let sortedAndFiltered = [...orders];
        if (sortPrice) {
            sortedAndFiltered.sort((a, b) => sortPrice === 'asc' ? a.price - b.price : b.price - a.price);
        }
        if (searchPhone) {
            sortedAndFiltered = sortedAndFiltered.filter(order => order.user && order.user.phoneNumber.includes(searchPhone));
        }
        if (searchCar) {
            sortedAndFiltered = sortedAndFiltered.filter(order => order.car.toLowerCase().includes(searchCar.toLowerCase()));
        }
        setFilteredOrders(sortedAndFiltered);
    }, [orders, searchPhone, searchCar, sortPrice]);

    const handleDialogOpen = (order) => {
        setSelectedOrder(order);
        setEditPrice(order.price);
        setEditStatus(order.status);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleSaveChanges = () => {
        dispatch(updateOrder({ id: selectedOrder._id, updatedData: { price: editPrice, status: editStatus } }));
        setOpenDialog(false);
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>Заказы</Typography>
            <TextField label="Поиск по номеру телефона" value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} margin="normal" />
            <TextField label="Поиск по марке авто" value={searchCar} onChange={(e) => setSearchCar(e.target.value)} margin="normal" />
            <Select value={sortPrice} onChange={(e) => setSortPrice(e.target.value)} displayEmpty>
                <MenuItem value="">Сортировать по цене</MenuItem>
                <MenuItem value="asc">По возрастанию</MenuItem>
                <MenuItem value="desc">По убыванию</MenuItem>
            </Select>
            <TableContainer component={Paper} style={{ marginTop: '20px', overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Авто</TableCell>
                            <TableCell align="right">Номер телефона</TableCell>
                            <TableCell align="right">Детали</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order._id} hover onClick={() => handleDialogOpen(order)}>
                                <TableCell component="th" scope="row">{order.car}</TableCell>
                                <TableCell align="right">{order.user ? order.user.phoneNumber : 'Неизвестный'}</TableCell>
                                <TableCell align="right"><Button>Подробнее</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
                <DialogTitle>Детали заказа</DialogTitle>
                <TableBody>
                    <TableRow>
                        <TableCell>ID заказа</TableCell>
                        <TableCell>{selectedOrder._id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Пользователь</TableCell>
                        <TableCell>{selectedOrder.user ? selectedOrder.user.userName : 'Неизвестный'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Контакты</TableCell>
                        <TableCell>{selectedOrder.user ? selectedOrder.user.phoneNumber : 'Неизвестный'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Авто</TableCell>
                        <TableCell>{selectedOrder.car}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Описание</TableCell>
                        <TableCell>{selectedOrder.description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Цена</TableCell>
                        <TableCell>{selectedOrder.price}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Статус</TableCell>
                        <TableCell>{selectedOrder.status}</TableCell>
                    </TableRow>
                </TableBody>
                <DialogContent>
                    <TextField label="Цена" type="number" fullWidth margin="normal" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
                    <Select fullWidth value={editStatus} onChange={(e) => setEditStatus(e.target.value)} margin="normal">
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="inProgress">In Progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="declined">Declined</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Отмена</Button>
                    <Button onClick={handleSaveChanges}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OrdersPage;
