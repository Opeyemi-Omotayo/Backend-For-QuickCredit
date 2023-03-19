const Loan = require('../models/loan');

const loanRequest = async(req, res, next) => {
    const { loan_amount, duration, repayable_amount, created_at, image, status } = req.body;

    const createdLoanRequest = new Loan({
        loan_amount,
         duration,
         repayable_amount,
         created_at,
         image: req.file.path,
         status
       });

       try {
        await createdLoanRequest.save();
      } catch (err) {
        const error = new ErrorMsg(
          'Signing up failed, please try again later.',
          500
        );
        return next(error);
      }
    
      res.status(201).json({ loanId: createdLoanRequest.id, status: createdLoanRequest.status });
}

exports.loanRequest = loanRequest;