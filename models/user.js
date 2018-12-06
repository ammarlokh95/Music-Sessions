import { Schema } from 'mongoose';

const User = new Schema({
  spotify_id: { type: Number, unique: true },
  email: { type: String, unique: true },
  display_name: String,
  birthdate: Date,
  country: String,
  external_urls: Object,
  following: Object,
});

export default User;
