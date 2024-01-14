import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParts } from '../redux/slices/parts';
import { Grid, Card, CardContent, Typography, CardMedia, Chip } from '@mui/material';

const PartsPage = () => {
    const dispatch = useDispatch();
    const parts = useSelector(state => state.parts.parts);
    const loading = useSelector(state => state.parts.status) === 'loading';

    useEffect(() => {
        dispatch(fetchParts());
    }, [dispatch]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Запчасти
            </Typography>
            <Grid container spacing={3}>
                {parts.map(part => (
                    <Grid item key={part._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="340"
                                image={part.imageUrl || 'default_part_image.jpg'}
                                alt={part.name}
                            />
                            <CardContent>
                                <Typography variant="h5">{part.name}</Typography>
                                <Typography variant="body1">{`Price: $${part.price}`}</Typography>
                                <Typography variant="body2">{part.description}</Typography>
                                <Chip
                                    label={part.available ? 'Есть на складе' : 'Нет на складе'}
                                    color={part.available ? 'success' : 'error'}
                                    size="small"
                                    style={{ marginTop: 10 }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default PartsPage;