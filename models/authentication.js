import express from 'express';
import User from './User.js';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';

const app = express();
const port = 3000;
const DB_URL = 'mongodb+srv://souvik:WIqYCzzIRuQK38wQ@cluster0.b4ncaw0.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
}));

// Define routes for signup and signin
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('User already exists');
    }
    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Store user data in session
    req.session.userId = newUser._id;

    res.status(201).send('Signup successful');
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || password != user.password) {
        return res.status(401).send('Invalid email or password');
    }

    // Store user data in session
    req.session.userId = user._id;
    res.status(200).send('Signin successful');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
