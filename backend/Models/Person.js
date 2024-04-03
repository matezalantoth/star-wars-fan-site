import mongoose from 'mongoose';

const Person = new mongoose.Schema({
  name: { type: String, default: null },
  height: { type: String, default: null },
  mass: { type: String, default: null },
  hair_color: { type: String, default: null },
  skin_color: { type: String, default: null },
  eye_color: { type: String, default: null },
  birth_year: { type: String, default: null },
  gender: { type: String, default: null },
  homeworld: { type: String, default: null },
  films: { type: Array, default: [] },
  species: { type: Array, default: [] },
  vehicles: { type: Array, default: [] },
  starships: { type: Array, default: [] },
  url: { type: String, default: null },
  createdAt: { type: Date, default: Date.now() },
  editedAt: { type: Date, default: Date.now() },
});
export default mongoose.model('Person', Person, 'people');
