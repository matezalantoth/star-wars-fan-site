import mongoose from 'mongoose';

const Film = new mongoose.Schema({
  title: { type: String },
  episode_id: { type: Number },
  opening_crawl: { type: String },
  director: { type: String },
  producer: { type: String },
  release_date: { type: String },
  characters: { type: Array },
  planets: { type: Array },
  starships: { type: Array },
  vehicles: { type: Array },
  species: { type: Array },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  url: { type: String, default: null },
});
export default mongoose.model('Film', Film, 'films');
