import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import User from './Models/User.js';
dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.URI).then(() => {
  console.log('Connected to MongoDB!');
  app.listen(
    process.env.PORT,
    console.log(
      `Backend server running on http://localhost:${process.env.PORT}`,
    ),
  );
});

const createUser = async (name, dob, email, password) => {
  const user = await User.create({
    name: name,
    dob: dob,
    email: email,
    password: password,
  });
  return user;
};

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email: email, password: password });
    if (!foundUser) {
      return res
        .status(404)
        .json({ message: 'No account was found matching the email' });
    }
    return res.status(200).json(foundUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong on our end' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    console.log(req.body);
    const { name, dob, email, password } = req.body;
    const user = await createUser(name, dob, email, password);
    if (!user) {
      throw e;
    }
    res.status(201).send(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Something went wrong on our end' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});
