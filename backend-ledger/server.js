import app from './src/app.js'
import 'dotenv/config.js'
import connectDB from './src/config/database.js'

const port = process.env.PORT || 3000;

// Connect to database
connectDB();

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});