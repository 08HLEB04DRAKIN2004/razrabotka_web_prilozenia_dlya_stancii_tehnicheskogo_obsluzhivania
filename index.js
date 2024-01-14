import express from 'express';
import mongoose from 'mongoose'; 
import multer from 'multer';
import cors from 'cors';

import {
    handleValidationErrors,
    allRolesAuth,
    adminOnlyAuth,
} from './utils/index.js';

import {
    userController,
    servicesControllers,
    ReviewController,
    partsController,
    orderController,
    employeeController,
} from './Controllers/index.js';

import {
    loginValidation,
    registerValidation,
    createServiceValidation,
    updateServiceValidation,
    createReviewValidation,
    updateReviewValidation,
    createPartValidation,
    updatePartValidation,
    createOrderValidation,
    updateOrderValidation,
    createEmployeeValidate,
    updateEmployeeValidate,
} from './validations.js';

mongoose 
    .connect('mongodb+srv://admin:Hesus2016@cluster0.vgtv5yo.mongodb.net/CarService')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERROR', err)); 

const app = express();

const storage = multer.diskStorage({ 
    destination: (_, __, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (_, file, cb) => { 
        cb(null, file.originalname) 
    }, 
});

const upload = multer({ storage });

app.use(express.json()); 
app.use(cors());
app.use('/uploads', express.static('uploads')); 

// media upload pathes
app.post('/upload', adminOnlyAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

//auth
app.post('/auth/login', loginValidation, handleValidationErrors, userController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, userController.register);
app.get('/auth/me', allRolesAuth, userController.getMe);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});