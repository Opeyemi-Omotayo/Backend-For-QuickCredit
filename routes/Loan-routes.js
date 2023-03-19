const express =  require("express");
const LoanControllers = require("../controllers/Loan-controllers");

const router = express.Router();

router.post('/loan-requests', LoanControllers.loanRequest);

module.exports = router;