import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe } from '../redux/slices/auth';
import { fetchOrders } from '../redux/slices/orders';
import { createReview, deleteReview, fetchAllReviews } from '../redux/slices/reviews';
import { Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.data);
    const orders = useSelector((state) => state.orders.orders);
    const reviews = useSelector((state) => state.reviews.reviews);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentReview, setCurrentReview] = useState({ orderId: '', text: '', rating: 0 });

    useEffect(() => {
        dispatch(fetchAuthMe());
        dispatch(fetchOrders());
        dispatch(fetchAllReviews());
    }, [dispatch]);

    const handleOpenDialog = (orderId) => {
        setCurrentReview({ ...currentReview, orderId });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentReview({ orderId: '', text: '', rating: 0 });
    };

    const handleReviewChange = (e) => {
        setCurrentReview({ ...currentReview, [e.target.name]: e.target.value });
    };

    const handleCreateReview = () => {
        dispatch(createReview({ orderId: currentReview.orderId, reviewData: { text: currentReview.text, rating: currentReview.rating } }));
        handleCloseDialog();
    };

    const handleDeleteReview = (reviewId) => {
        dispatch(deleteReview(reviewId));
    };

    const findReviewByOrderId = (orderId) => {
        return reviews.find(review => review.order === orderId);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Card>
                <Typography variant='h5'>{user.userName}</Typography>
                <Typography variant='body1'>Телефон: {user.phoneNumber}</Typography>
            </Card>
            <Typography variant='h6' style={{ marginTop: '20px' }}>Ваши заказы:</Typography>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="right">Авто</TableCell>
                            <TableCell align="right">Описание</TableCell>
                            <TableCell align="right">Статус</TableCell>
                            <TableCell align="right">Цена</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>                <TableBody>
                        {orders.map((order) => (
                            <React.Fragment key={order._id}>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {order._id}
                                    </TableCell>
                                    <TableCell align="right">{order.car}</TableCell>
                                    <TableCell align="right">{order.description}</TableCell>
                                    <TableCell align="right">{order.status}</TableCell>
                                    <TableCell align="right">{order.price}</TableCell>
                                    <TableCell align="right">
                                        {order.status === 'completed' && (
                                            <>
                                                <Button color="primary" onClick={() => handleOpenDialog(order._id)}>
                                                    Написать отзыв
                                                </Button>

                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                                {order.status === 'completed' && (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <Typography variant="subtitle2">Ваш отзыв:</Typography>
                                            {findReviewByOrderId(order._id) ? (
                                                <>
                                                    <Typography variant="body2">
                                                        {findReviewByOrderId(order._id).text}
                                                    </Typography>
                                                    <Button
                                                        color="secondary"
                                                        onClick={() => handleDeleteReview(findReviewByOrderId(order._id)._id)}
                                                    >
                                                        Удалить отзыв
                                                    </Button>
                                                </>
                                            ) : (
                                                <Typography variant="body2" color="textSecondary">
                                                    Вы не добавляли отзывов
                                                </Typography>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for Adding Review */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add Review</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="text"
                        label="Review Text"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentReview.text}
                        onChange={handleReviewChange}
                    />
                    <TextField
                        margin="dense"
                        name="rating"
                        label="Rating"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={currentReview.rating}
                        onChange={handleReviewChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleCreateReview}>Submit Review</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserProfile;