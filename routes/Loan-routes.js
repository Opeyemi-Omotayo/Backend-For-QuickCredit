const express =  require("express");
const LoanControllers = require("../controllers/Loan-controllers");
const Auth = require("../middleware/auth");


const router = express.Router();

router.post('/loanrequests', Auth.verifyUserToken , Auth.IsUser, LoanControllers.loanRequest);

router.get("/loanrequests" , Auth.verifyUserToken, Auth.IsAdmin, LoanControllers.getAllLoanRequest);

router.patch("/loanrequests/:rid", Auth.verifyUserToken, Auth.IsAdmin, LoanControllers.updateStatus);

router.get("/loanrequests/:id/status", LoanControllers.getUserLoanId);

module.exports = router;