const express = require('express');
const cors = require('cors')
const authRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')
const userRouter = require('./routes/user.routes')
const cookieParser = require('cookie-parser')
const handleError = require('./middleware/errors.middleware')
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors(
    {
        credentials: true,
        origin: process.env.FRONTEND_URL
    }
))

app.use('/api/auth', authRouter)

app.use('/api/post', postRouter)

app.use('/api/user', userRouter)


app.use(handleError)

module.exports = app;