import { sendRegistrationEmail } from '../services/mail.service.js';
import userModel from '../models/userModel.js';
const register = async (req, res) => {
    const { name, email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
        const error = new Error('User already exist');
        error.status = 400;
        throw error;
    }

    const user = await userModel.create({ name, email, password });

    sendRegistrationEmail({ name, email });

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = userModel.findOne({ email }).select('+password');

    if (!user) {
        const error = new Error('User does not exist');
        error.status = 400;
        throw error;
    }

    const isPasswordMatch = await comparePassword(password);

    if (!isPasswordMatch) {
        const error = new Error('Email or Password does not match');
        error.status = 400;
        throw error;
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET,
        { expiresIn: '1d' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
}

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })
}


const getMe = async (req, res) => {
    const userId = req.user.id;
    
    const user = await userModel.findById(userId);

    res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: user
    });
}
export { register, login, logout, getMe };
