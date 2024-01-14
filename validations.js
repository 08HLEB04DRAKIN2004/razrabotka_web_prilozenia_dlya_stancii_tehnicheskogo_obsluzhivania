import { body, param } from 'express-validator';

//auth validation
export const loginValidation = [
    body('phoneNumber', 'Invalid phoneNumber format').notEmpty(),
    body('password', 'Password shoud be at least 5 symbols').isLength({ min: 8 }),
];

export const registerValidation = [
    body('phoneNumber', 'Invalid phoneNumber format').notEmpty(),
    body('password', 'Password should be at least 8 symbols').isLength({ min: 8 }),
    body('userName', 'Name is too short').isLength({ min: 2 }),
    body('role', 'Invalid role').custom((value) => {
        const roles = ['user', 'admin'];
        if (!roles.includes(value)) {
            throw new Error('Invalid role');
        }
        return true;
    }),
];

//service validation
export const createServiceValidation = [
    body('name', 'Product name is required').notEmpty(),
    body('description', 'Product description is required').notEmpty(),
    body('price', 'Product price must be a number').isNumeric(),
    body('imageUrl', 'Invalid URL format for image').optional(),
];

export const updateServiceValidation = [
    body('name', 'Product name is required').optional().notEmpty(),
    body('description', 'Product description is required').optional().notEmpty(),
    body('price', 'Product price must be a number').optional().isNumeric(),
    body('imageUrl', 'Invalid URL format for image').optional(),
];

//review validation
export const createReviewValidation = [
    param('id', 'Invalid order ID').isMongoId(),
    body('text', 'Отзыв слишком короткий').isLength({ min: 4 }).isString(),
    body('rating', 'Rate should be a number').isNumeric().isFloat({ min: 1, max: 10 }),
];

export const updateReviewValidation = [
    body('text', 'Отзыв слищком короткий').optional().isLength({ min: 4 }).isString(),
    body('rating', 'Rate should be a number').optional().isNumeric().isFloat({ min: 1, max: 10 }),
];

//part validation
export const createPartValidation = [
    body('name', 'Product name is required').notEmpty(),
    body('description', 'Product description is required').notEmpty(),
    body('price', 'Product price must be a number').isNumeric(),
    body('imageUrl', 'Invalid URL format for image').optional().isURL(),
    body('available', 'Available must be a boolean').isBoolean(),
];

export const updatePartValidation = [
    body('name', 'Product name is required').optional().notEmpty(),
    body('description', 'Product description is required').optional().notEmpty(),
    body('price', 'Product price must be a number').optional().isNumeric(),
    body('imageUrl', 'Invalid URL format for image').optional().isURL(),
    body('available', 'Available must be a boolean').optional().isBoolean(),
];

//order validation
export const createOrderValidation = [
    body('user', 'User ID is required').notEmpty(),
    body('car', 'Car information is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    body('status', 'Invalid status').isIn(['pending', 'inProgress', 'completed', 'declined']),
    body('price', 'Price must be a number').optional().isNumeric(),
    body('date', 'Invalid date format').notEmpty().isISO8601().toDate(),
];

export const updateOrderValidation = [
    body('car', 'Car information is required').optional().notEmpty(),
    body('description', 'Description is required').optional().notEmpty(),
    body('status', 'Invalid status').optional().isIn(['pending', 'inProgress', 'completed', 'declined']),
    body('price', 'Price must be a number').optional().isNumeric(),
    body('date', 'Invalid date format').optional().notEmpty().isISO8601().toDate(),
];

//employee validation
export const createEmployeeValidate = [
    body('name', 'Name is required').notEmpty(),
    body('position', 'Position is required').notEmpty(),
    body('specialization', 'Specialization is required').notEmpty(),
    body('imageUrl', 'Invalid URL format for image').optional().isURL(),
];

export const updateEmployeeValidate = [
    body('name', 'Name is required').optional().notEmpty(),
    body('position', 'Position is required').optional().notEmpty(),
    body('specialization', 'Specialization is required').optional().notEmpty(),
    body('imageUrl', 'Invalid URL format for image').optional().isURL(),
];