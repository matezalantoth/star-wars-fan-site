import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

mongoose.connect(process.env.URI).then(() => {
  console.log('Connected to MongoDB!');
  app.listen(
    process.env.PORT,
    console.log(
      `Backend server running on http://localhost:${process.env.PORT}`,
    ),
  );
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});
