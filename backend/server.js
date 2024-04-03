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
      `Backend server running on http://localhost:${process.env.PORT}`
    )
  );
});

// "https://swapi.dev/api/films/",

const getMovies = async () => {
  const httpResponse = await fetch('https://swapi.dev/api/films/');

  const response = await httpResponse.json();
  console.log();
  return response;
};

getMovies();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/films', async (req, res) => {
  res.send(await getMovies());
});
