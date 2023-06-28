const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: Object, required: true },
  role: { type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
