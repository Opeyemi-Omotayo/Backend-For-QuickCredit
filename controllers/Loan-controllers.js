const Loan = require('../models/loan');
const ErrorMsg = require("../models/Error");

const loanRequest = async(req, res, next) => {
    const { loan_amount, duration, repayable_amount, created_at, status } = req.body;

    const createdLoanRequest = new Loan({
        loan_amount,
         duration,
         repayable_amount,
         created_at,
         status
       });

       try {
        await createdLoanRequest.save();
      } catch (err) {
        const error = new ErrorMsg(
          'Loan Request failed, please try again later.',
          500
        );
        return next(error);
      }
    
      res.status(201).json({ loanId: createdLoanRequest.id, status: createdLoanRequest.status });
}

exports.loanRequest = loanRequest;