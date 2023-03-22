const express =  require("express");
const LoanControllers = require("../controllers/Loan-controllers");

const router = express.Router();

router.post('/loanrequests', LoanControllers.loanRequest);

module.exports = router;