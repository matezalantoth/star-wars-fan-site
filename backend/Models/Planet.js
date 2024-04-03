import mongoose from 'mongoose';

const Planet = new mongoose.Schema({
  name: { type: String, default: null },
  rotation_period: { type: String, default: null },
  orbital_period: { type: String, default: null },
  diameter: { type: String, default: null },
  climate: { type: String, default: null },
  gravity: { type: String, default: null },
  terrain: { type: String, default: null },
  surface_water: { type: String, default: null },
  population: { type: String, default: null },
  residents: { type: Array, default: [] },
  films: { type: Array, default: [] },
  url: { type: String, default: null },
  createdAt: { type: Date, default: Date.now() },
  editedAt: { type: Date, default: Date.now() },
});
export default mongoose.model('Planet', Planet, 'planets');
