const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const SignUpSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true }
});

SignUpSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Signup", SignUpSchema);
