import mongoose from 'mongoose';

const Vehicle = new mongoose.Schema({
  name: { type: String, default: null },
  model: { type: String, default: null },
  manufacturer: { type: String, default: null },
  cost_in_credits: { type: String, default: null },
  length: { type: String, default: null },
  max_atmosphering_speed: { type: String, default: null },
  crew: { type: String, default: null },
  passengers: { type: String, default: null },
  cargo_capacity: { type: String, default: null },
  consumables: { type: String, default: null },
  vehicle_class: { type: String, default: null },
  pilots: { type: Array, default: [] },
  films: { type: Array, default: [] },
  url: { type: String, default: null },
  createdAt: { type: Date, default: Date.now() },
  editedAt: { type: Date, default: Date.now() },
});
export default mongoose.model('Vehicle', Vehicle, 'vehicles');
