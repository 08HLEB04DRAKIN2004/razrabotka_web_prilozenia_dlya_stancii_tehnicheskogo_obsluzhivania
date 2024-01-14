import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../redux/slices/services';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';

const ServicesPage = () => {
    const dispatch = useDispatch();
    const services = useSelector(state => state.services.services);
    const loading = useSelector(state => state.services.status) === 'loading';

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Услуги
            </Typography>
            <Grid container spacing={3}>
                {services.map(service => (
                    <Grid item key={service._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="340"
                                image={service.imageUrl || 'default_service_image.jpg'}
                                alt={service.name}
                            />
                            <CardContent>
                                <Typography variant="h5">{service.name}</Typography>
                                <Typography variant="body1">{`Price: $${service.price}`}</Typography>
                                <Typography variant="body2">{service.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ServicesPage;