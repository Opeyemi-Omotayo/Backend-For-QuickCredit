const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loanSchema = new Schema({
  loan_amount: { type: Number, required: true },
  duration: { type: Number, required: true },
  repayable_amount: { type: Number, required: true },
  created_at: { type: Date , required: true},
  image: { type: String, required: true},
  status: {type: String, required: false}
});

module.exports = mongoose.model("loan", loanSchema);
