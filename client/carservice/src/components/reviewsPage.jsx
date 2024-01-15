import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllReviews } from '../redux/slices/reviews';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const AllReviewsPage = () => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews.reviews);

    useEffect(() => {
        dispatch(fetchAllReviews());
    }, [dispatch]);

    if (!reviews) {
        return <div>Loading...</div>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Авто</TableCell>
                        <TableCell align="right">Описание заказа</TableCell>
                        <TableCell align="right">Отзыв</TableCell>
                        <TableCell align="right">Рейтинг</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reviews.map((review) => (
                        <TableRow key={review._id}>
                            <TableCell align="right">{review.order.car}</TableCell>
                            <TableCell align="right">{review.order.description}</TableCell>
                            <TableCell align="right">{review.text}</TableCell>
                            <TableCell align="right">{review.rating}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AllReviewsPage;