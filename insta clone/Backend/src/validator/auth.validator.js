const {body, validationResult} = require("express-validator")

const validate=(req, res, next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }
    next()
}


const registerValidator = [
    body('username').trim().notEmpty().withMessage("username is required").isLength({min:3}).withMessage("username must be at least 3 characters long"),

    body('email').trim().notEmpty().withMessage("email is required").isEmail().withMessage("enter a valid email"),

    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*]/).withMessage("Password must contain at least one special character"),
    
    validate
]

const loginValidator = [
    body('identifier').trim().notEmpty().withMessage("identifier is required"),
    body('password').trim().notEmpty().withMessage("password is required"),
    validate
]

module.exports = {registerValidator, loginValidator}
