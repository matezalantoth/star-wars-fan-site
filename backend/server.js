import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import User from './Models/User.js';
import Person from './Models/Person.js';
import Vehicle from './Models/Vehicle.js';
import Starship from './Models/Starship.js';
import Planet from './Models/Planet.js';
import Film from './Models/Film.js';
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

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const recursive = async (data) => {
  if (data.next) {
    const newData = await fetchData(data.next);
    await Person.create(newData.results);
    if (newData.next) {
      await recursive(newData);
    }
  }
};

const fetchHomeworld = async (person) => {
  const response = await fetch(person.homeworld);
  const data = await response.json();
  return data.name;
};

const fetchCharFilms = async (person) => {
  return Promise.all(
    person.films.map(async (film) => {
      const response = await fetch(film);
      const data = await response.json();
      return data.title;
    }),
  );
};

app.post('/api/setter', async (req, res) => {
  const data = await fetchData('https://swapi.dev/api/people/');
  await Person.create(data.results);
  await recursive(data);
  const people = await Person.find({});
  console.log(people.length);
  people.forEach(async (person) => {
    person.homeworld = await fetchHomeworld(person);
    person.films = await fetchCharFilms(person);
    await person.save();
  });
  res.status(200).send(data);
});

app.patch('/api/user/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body);
  res.status(200).json(user);
});

app.get('/api/user/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
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

    if (!user) {
      throw e;
    }
    res.status(201).send(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong on our end' });
  }
});

app.get('/api/user/:id/favourites/:array', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }
    res.status(200).json(user.favourites[req.params.array]);
  } catch (e) {
    res.status(500).json({ errorMessage: 'Something went wrong on our end' });
  }
});

app.patch('/api/user/:id/favourites/films', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }
    user.favourites.films.push(req.body);
    await user.save();
    res
      .status(200)
      .json({ message: `${req.body.title} has been added to favourites` });
  } catch (e) {
    res.status(500).json({ errorMessage: 'Something went wrong on our end' });
  }
});

app.delete('/api/user/:id/favourites/films', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }
    user.favourites.films = user.favourites.films.filter((char) => {
      return char._id !== req.body._id;
    });
    await user.save();
    res
      .status(204)
      .json({ message: `${req.body.title} has been removed from favourites` });
  } catch (e) {
    res.status(500).json({ errorMessage: 'Something went wrong on our end' });
  }
});

app.patch('/api/user/:id/favourites/planets', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }
    user.favourites.planets.push(req.body);
    await user.save();
    res
      .status(200)
      .json({ message: `${req.body.name} has been added to favourites` });
  } catch (e) {
    res.status(500).json({ errorMessage: 'Something went wrong on our end' });
  }
});

app.delete('/api/user/:id/favourites/planets', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }
    user.favourites.planets = user.favourites.planets.filter((planet) => {
      return planet._id !== req.body._id;
    });
    await user.save();
    res
      .status(204)
      .json({ message: `${req.body.name} has been removed from favourites` });
  } catch (e) {
    res.status(500).json({ errorMessage: 'Something went wrong on our end' });
  }
});

app.patch('/api/user/:id/favourites/characters', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }
    user.favourites.characters.push(req.body);
    await user.save();
    res
      .status(200)
      .json({ message: `${req.body.name} has been added to favourites` });
  } catch (e) {
    res.status(500).json({ errorMessage: 'Something went wrong on our end' });
  }
});

app.delete('/api/user/:id/favourites/characters', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }
    user.favourites.characters = user.favourites.characters.filter((char) => {
      return char._id !== req.body._id;
    });
    await user.save();
    res
      .status(204)
      .json({ message: `${req.body.name} has been removed from favourites` });
  } catch (e) {
    res.status(500).json({ errorMessage: 'Something went wrong on our end' });
  }
});

app.patch('/api/user/:id/favourites/spaceships', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }
    user.favourites.spaceships.push(req.body);
    await user.save();
    res
      .status(200)
      .json({ message: `${req.body.name} has been added to favourites` });
  } catch (e) {
    res.status(500).json({ errorMessage: 'Something went wrong on our end' });
  }
});

app.delete('/api/user/:id/favourites/spaceships', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }
    user.favourites.spaceships = user.favourites.spaceships.filter(
      (spaceships) => {
        return spaceships._id !== req.body._id;
      },
    );
    await user.save();
    res
      .status(204)
      .json({ message: `${req.body.name} has been removed from favourites` });
  } catch (e) {
    res.status(500).json({ errorMessage: 'Something went wrong on our end' });
  }
});

app.patch('/api/user/:id/favourites/vehicles', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }
    user.favourites.vehicles.push(req.body);
    await user.save();
    res
      .status(200)
      .json({ message: `${req.body.name} has been added to favourites` });
  } catch (e) {
    res.status(500).json({ errorMessage: 'Something went wrong on our end' });
  }
});

app.delete('/api/user/:id/favourites/vehicles', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }
    user.favourites.vehicles = user.favourites.vehicles.filter((vehicle) => {
      return vehicle._id !== req.body._id;
    });
    await user.save();
    res
      .status(204)
      .json({ message: `${req.body.name} has been removed from favourites` });
  } catch (e) {
    res.status(500).json({ errorMessage: 'Something went wrong on our end' });
  }
});

app.get('/api/films', async (req, res) => {
  const films = await Film.find().sort({ episode_id: 1 });
  res.send(films);
});

app.get('/api/characters', async (req, res) => {
  const people = await Person.find();
  res.send(people);
});

app.get('/api/planets', async (req, res) => {
  const planets = await Planet.find();
  res.send(planets);
});

app.get('/api/starships', async (req, res) => {
  const starships = await Starship.find();
  res.send(starships);
});

app.get('/api/vehicles', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.send(vehicles);
});
