import { body, validationResult } from 'express-validator';


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       const error = new Error('Validation failed');
       error.status = 400;
       error.errors = errors.array();
       throw error;
    }
    next();
};

const validateRegister = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

        validate
];

const validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required'),

        validate
];



export { validateRegister, validateLogin, };
