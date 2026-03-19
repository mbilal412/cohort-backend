import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import sendRegisterEmail from "../services/mail.service.js"

export const register = async (req, res, next) => {
  const { name, email, password } = req.body

  const isUserExist = await userModel.findOne({ email })

  if (isUserExist) {
    const error = new Error("User already exists")
    error.status = 409
    throw error
  }



  const user = await userModel.create({ name, email, password })


  const verificationToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  await sendRegisterEmail({
    to: email,
    subject: "Registeration on perplexity",
    html: `
            <h2>Verify your Email Address</h2>
            <p>Thank you for signing up! We're excited to have you on board.</p>
            <p>Please click the link below to verify your email address and activate your account.</p>
            <a href="http://localhost:5173/verified-email?token=${verificationToken}">Verify Email</a>
            <p>If you did not create an account, you can safely ignore this email.</p>
            <p>This link will expire in 24 hours.</p>`
  })



  res.status(201).json({
    message: "User registered successfully",
    user: { _id: user._id, name: user.name, email: user.email },
  })
}


export const verifyEmail = async (req, res) => {
  const { token } = req.query

  if(!token){
    const error = new Error("Token is required")
    error.status = 400
    throw error
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  const user = await userModel.findOne({ email: decoded.email })

  if (!user) {
    const error = new Error("User not found")
    error.status = 404
    throw error
  }

  user.verified = true
  await user.save()

  res.status(200).json({
    message: "Email verified successfully",
    success: true,
    user,
  })
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("All fields are required");
    error.status = 400;
    throw error;
  }

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  if(!user.verified){
    const error = new Error("Please verify your email address");
    error.status = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })

  res.status(200).json({
    message: "Login successful",
    success: true,
    user: { _id: user._id, name: user.name, email: user.email },
  });
};


export const logout = async (req, res) => {
  res.clearCookie('token')
  res.status(200).json({
    message: "Logout successful",
    success: true,
  })
}

export const getMe = async (req, res) => {
  const user = await userModel.findById(req.user.id);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  if(!user.verified){
    const error = new Error("Please verify your email address");
    error.status = 401;
    throw error;
  }

  res.status(200).json({ user });
};