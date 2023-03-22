const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loanSchema = new Schema({
  loan_amount: { type: String, required: true },
  duration: { type: String, required: true },
  repayable_amount: { type: String, required: true },
  created_at: { type: Date , required: true},
  status: {type: String, required: false}
});

module.exports = mongoose.model("loan", loanSchema);
