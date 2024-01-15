import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParts, createPart, deletePart, updatePart } from '../redux/slices/parts';
import { Grid, Card, CardContent, Typography, CardMedia, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Switch, FormControlLabel } from '@mui/material';
import axios from '../redux/axios';

const AdminPartsPage = () => {
    const dispatch = useDispatch();
    const parts = useSelector(state => state.parts.parts);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [currentPart, setCurrentPart] = useState(null);
    const [newPart, setNewPart] = useState({ name: '', description: '', price: '', imageUrl: '', available: false });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        dispatch(fetchParts());
    }, [dispatch]);

    const handleOpenEditDialog = (part) => {
        setCurrentPart(part);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setCurrentPart(null);
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
        setNewPart({ name: '', description: '', price: '', imageUrl: '', available: false });
    };

    const handleChange = (e, partType) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        partType === 'new' ? setNewPart({ ...newPart, [name]: newValue }) : setCurrentPart({ ...currentPart, [name]: newValue });
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
            console.error('Error uploading file:', error);
            return null;
        }
    }; const handleCreateOrUpdatePart = async (isCreate) => {
        let partData = isCreate ? newPart : currentPart;

        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);
            const uploadedImageData = await uploadImage(formData);
            if (uploadedImageData && uploadedImageData.url) {
                partData = { ...partData, imageUrl: `${window.location.protocol}//localhost:4444${uploadedImageData.url}` };
            }
        }

        if (isCreate) {
            dispatch(createPart(partData));
            handleCloseCreateDialog();
        } else {
            dispatch(updatePart({ id: currentPart._id, updatedData: partData }));
            handleCloseEditDialog();
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Управление запчастями</Typography>
            <Button color="primary" onClick={handleOpenCreateDialog}>Create New Part</Button>
            <Grid container spacing={3}>
                {parts.map(part => (
                    <Grid item key={part._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="240"
                                image={part.imageUrl || 'default_part_image.jpg'}
                                alt={part.name}
                            />
                            <CardContent>
                                <Typography variant="h5">{part.name}</Typography>
                                <Typography variant="body1">{`Price: $${part.price}`}</Typography>
                                <Typography variant="body2">{part.description}</Typography>
                                <Typography variant="body2">{`Available: ${part.available ? 'Yes' : 'No'}`}</Typography>
                                <Button color="primary" onClick={() => handleOpenEditDialog(part)}>Edit</Button>
                                <Button color="secondary" onClick={() => dispatch(deletePart(part._id))}>Delete</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog for Creating a New Part */}
            <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
                <DialogTitle>Create New Part</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newPart.name}
                        onChange={(e) => handleChange(e, 'new')}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="standard"
                        value={newPart.description}
                        onChange={(e) => handleChange(e, 'new')}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newPart.price}
                        onChange={(e) => handleChange(e, 'new')}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={newPart.available}
                                onChange={(e) => handleChange(e, 'new')}
                                name="available"
                            />
                        }
                        label="Available"
                    />
                    <TextField type="file"
                        margin="dense"
                        fullWidth
                        variant="standard"
                        onChange={handleFileChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateDialog}>Cancel</Button>
                    <Button onClick={() => handleCreateOrUpdatePart(true)}>Create</Button>
                </DialogActions>
            </Dialog>{/* Dialog for Editing a Part */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Part</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentPart?.name}
                        onChange={(e) => handleChange(e, 'edit')}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="standard"
                        value={currentPart?.description}
                        onChange={(e) => handleChange(e, 'edit')}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={currentPart?.price}
                        onChange={(e) => handleChange(e, 'edit')}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={currentPart?.available || false}
                                onChange={(e) => handleChange(e, 'edit')}
                                name="available"
                            />
                        }
                        label="Available"
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
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={() => handleCreateOrUpdatePart(false)}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminPartsPage;
