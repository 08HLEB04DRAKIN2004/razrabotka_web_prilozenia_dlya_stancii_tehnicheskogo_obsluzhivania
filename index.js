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
    servicesController,
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
    .connect('mongodb+srv://glebdrakin1:jqzWZiPcjn4fqXbY@cluster0.s4jomw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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

//services
app.post('/services/create', adminOnlyAuth, createServiceValidation, handleValidationErrors, servicesController.create);
app.delete('/services/:id/delete', adminOnlyAuth, servicesController.remove);
app.patch('/services/:id/update', adminOnlyAuth, updateServiceValidation, handleValidationErrors, servicesController.update);
app.get('/services/:id', servicesController.getOne);
app.get('/services', servicesController.getAll);

//reviews
app.post('/reviews/:orderId/create',
    allRolesAuth,
    createReviewValidation,
    handleValidationErrors,
    ReviewController.create
);
app.delete('/reviews/:reviewId/delete', allRolesAuth, ReviewController.remove);
app.patch('/reviews/:reviewId/update', adminOnlyAuth, updateReviewValidation, handleValidationErrors, ReviewController.update)
app.get('/reviews', ReviewController.getAllReviews)

//parts
app.post('/parts/create',
    adminOnlyAuth,
    createPartValidation,
    handleValidationErrors,
    partsController.create
);
app.delete('/parts/:id/delete',
    adminOnlyAuth,
    partsController.remove
);
app.patch('/parts/:id/update',
    adminOnlyAuth,
    updatePartValidation,
    handleValidationErrors,
    partsController.update
);
app.get('/parts/:id',
    partsController.getOne
);
app.get('/parts',
    partsController.getAll
);

//orders
app.post('/orders/create',
    allRolesAuth,
    createOrderValidation,
    handleValidationErrors,
    orderController.create
);
app.delete('/orders/:id/delete',
    adminOnlyAuth,
    orderController.remove
);
app.patch('/orders/:id/update',
    adminOnlyAuth,
    updateOrderValidation,
    handleValidationErrors,
    orderController.update
);
app.get('/orders/:id',
    allRolesAuth,
    orderController.getOne
);
app.get('/orders',
    allRolesAuth,
    orderController.getAll
);

//employees
app.post('/employees/create',
    adminOnlyAuth,
    createEmployeeValidate,
    handleValidationErrors,
    employeeController.create
);
app.delete('/employees/:id/delete',
    adminOnlyAuth,
    employeeController.remove
);
app.patch('/employees/:id/update',
    adminOnlyAuth,
    updateEmployeeValidate,
    handleValidationErrors,
    employeeController.update
);
app.get('/employees/:id',
    employeeController.getOne
);
app.get('/employees',
    employeeController.getAll
);
app.post('/auth/create-admin', adminOnlyAuth, async (req, res) => {
    try {
        const { userName, phoneNumber, password, role } = req.body;

        // Check if the role is set to admin
        if (role !== 'admin') {
            return res.status(400).json({ message: 'Invalid role for admin creation' });
        }

        // Hash the password before saving it
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new user with the role of admin
        const newUser = new User({
            userName,
            phoneNumber,
            passwordHash,
            role,
        });

        await newUser.save();

        res.json({ message: 'Admin created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});