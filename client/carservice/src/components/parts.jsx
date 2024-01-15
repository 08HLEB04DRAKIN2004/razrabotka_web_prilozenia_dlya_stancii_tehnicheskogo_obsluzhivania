import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParts } from '../redux/slices/parts';
import { Grid, Card, CardContent, Typography, CardMedia, Chip, Modal, Box } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const PartsPage = () => {
    const dispatch = useDispatch();
    const parts = useSelector(state => state.parts.parts);
    const loading = useSelector(state => state.parts.status) === 'loading';
    const [selectedPart, setSelectedPart] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchParts());
    }, [dispatch]);

    const handleOpen = (part) => {
        setSelectedPart(part);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>Запчасти</Typography>
            <Grid container spacing={3}>
                {parts.map(part => (
                    <Grid item key={part._id
                    } xs={12} sm={6} md={4}>
                        <Card
                            sx={{ '&:hover': { boxShadow: 6 } }}
                            onClick={() => handleOpen(part)}
                        >
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Свяжитесь с нами для консультации, заказа или уточнения наличия детали
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {selectedPart ? `+375 33 512 77 23` : ''}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default PartsPage;