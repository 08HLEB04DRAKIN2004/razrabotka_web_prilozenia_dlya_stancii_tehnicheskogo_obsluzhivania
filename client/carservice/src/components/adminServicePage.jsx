import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, createService, deleteService, updateService } from '../redux/slices/services';
import { Grid, Card, CardContent, Typography, CardMedia, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from '../redux/axios';

const ServicesAdminPage = () => {
    const dispatch = useDispatch();
    const services = useSelector(state => state.services.services);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [currentService, setCurrentService] = useState(null);
    const [newService, setNewService] = useState({ name: '', description: '', price: '', imageUrl: '', });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const handleOpenEditDialog = (service) => {
        setCurrentService(service);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setCurrentService(null);
    };

    const handleDelete = (id) => {
        dispatch(deleteService(id));
    };

    const handleChange = (e) => {
        setCurrentService({ ...currentService, [e.target.name]: e.target.value });
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
        setNewService({ name: '', description: '', price: '', imageUrl: '' });
    };

    const handleNewServiceChange = (e) => {
        setNewService({ ...newService, [e.target.name]: e.target.value });
    };

    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const uploadImage = async (formData) => {
        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
            return null;
        }
    };

    const handleCreateOrUpdateService = async (isCreate) => {
        let serviceData = isCreate ? newService : currentService;

        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);
            const uploadedImageData = await uploadImage(formData);
            if (uploadedImageData && uploadedImageData.url) {
                serviceData = { ...serviceData, imageUrl: `${window.location.protocol}//localhost:4444${uploadedImageData.url}` };
            }
        }

        if (isCreate) {
            dispatch(createService(serviceData));
            handleCloseCreateDialog();
        } else {
            dispatch(updateService({ id: currentService._id, updatedData: serviceData }));
            handleCloseEditDialog();
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Управление сервисами</Typography>
            <Button color="primary" onClick={handleOpenCreateDialog}>Добавить сервис</Button>
            <Grid container spacing={3}>
                {services.map(service => (
                    <Grid item key={service._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="240"
                                image={service.imageUrl || 'default_service_image.jpg'}
                                alt={service.name}
                            />
                            <CardContent>
                                <Typography variant="h5">{service.name}</Typography>
                                <Typography variant="body1">{`Price: $${service.price}`}</Typography>
                                <Typography variant="body2">{service.description}</Typography>
                                <Button color="primary" onClick={() => handleOpenEditDialog(service)}>Изменить</Button>
                                <Button color="secondary" onClick={() => handleDelete(service._id)}>Удалить</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Редактировать сервис</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Название"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentService?.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Описание"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentService?.description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Цена"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={currentService?.price}
                        onChange={handleChange}
                    />
                    <TextField
                        type="file"
                        margin="dense"
                        fullWidth
                        variant="standard"
                        onChange={handleFileChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Отмена</Button>
                    <Button onClick={() => handleCreateOrUpdateService(false)}>Сохранить</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
                <DialogTitle>Добавить новый сервис</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Название"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newService.name}
                        onChange={handleNewServiceChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Описание"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newService.description}
                        onChange={handleNewServiceChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Цена"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newService.price}
                        onChange={handleNewServiceChange}
                    />
                    <TextField
                        type="file"
                        margin="dense"
                        fullWidth
                        variant="standard"
                        onChange={handleFileChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateDialog}>Отмена</Button>
                    <Button onClick={() => handleCreateOrUpdateService(true)}>Создать</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ServicesAdminPage;                