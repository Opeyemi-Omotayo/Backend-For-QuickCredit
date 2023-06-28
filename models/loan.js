const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loanSchema = new Schema({
  loan_amount: { type: Number, required: true },
  duration_in_days: { type: Number, required: true },
  repayable_amount: { type: Number, required: true },
  userId: { type: String, required: true },
  username:{ type: String, required: true },
  created_at: { type: Date, required: true},
  status: {type: String, required: true}
});

module.exports = mongoose.model("loan", loanSchema);
