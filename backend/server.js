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

app.patch('/api/user/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body);
  res.status(200).json(user);
});

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
    const { name, dob, email, password } = req.body;
    if (Date.parse(dob) > Date.now()) {
      return res.status(400).json({ message: 'That is an invalid birthday' });
    }
    const duplicateUser = await User.findOne({ email: email });

    if (duplicateUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const user = await createUser(name, dob, email, password);
    console.log(user);
    if (!user) {
      throw e;
    }
    res.status(201).send(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong on our end' });
  }
});

const getMovies = async () => {
  const httpResponse = await fetch('https://swapi.dev/api/films/');
  const response = await httpResponse.json();
  return response;
};

getMovies();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/films', async (req, res) => {
  res.send(await getMovies());
});
