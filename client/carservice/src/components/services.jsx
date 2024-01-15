import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../redux/slices/services';
import { Grid, Card, CardContent, Typography, CardMedia, Modal, Box } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ServicesPage = () => {
    const dispatch = useDispatch();
    const services = useSelector(state => state.services.services);
    const loading = useSelector(state => state.services.status) === 'loading';
    const [selectedService, setSelectedService] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const handleOpen = (service) => {
        setSelectedService(service);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>Услуги</Typography>
            <Grid container spacing={3}>
                {services.map(service => (
                    <Grid item key={service._id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ '&:hover': { boxShadow: 6 } }}
                            onClick={() => handleOpen(service)}
                        >
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Свяжитесь с нами для заказа услуги
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {selectedService ? `+375 33 512 77 23` : ''}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default ServicesPage;