const express =  require("express");
const LoanControllers = require("../controllers/Loan-controllers");

const router = express.Router();

router.post('/loanrequests', LoanControllers.loanRequest);

router.get("/getAllLoanRequests", LoanControllers.getAllLoanRequest);

router.patch("/loanrequest/:rid", LoanControllers.updateStatus);

module.exports = router;