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

const getAllLoanRequest = async (req, res, next) => {
  let users;
  try {
    users = await Loan.find({}, "-__v");
  } catch (err) {
    const error = new ErrorMsg(
      'Fetching Loan Requests failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const updateStatus = async (req, res, next) => {
  const { status } = req.body;
  const requestId = req.params.rid;

  let loanRequest;
  // try {
    loanRequest = await Loan.findById(requestId);
  // } catch (err) {
  //   const error = new ErrorMsg(
  //     'Invalid status!.Accepted values are approved, rejected',
  //     400
  //   );
  //   return next(error);
  // }

  loanRequest.status = status;
  
  try {
    await loanRequest.save();
  } catch (err) {
    const error = new ErrorMsg(
      'Something went wrong, could not update request.',
      500
    );
    return next(error);
  }

  res.status(200).json({ loanRequest: loanRequest.toObject({ getters: true }) });
};

exports.loanRequest = loanRequest;
exports.getAllLoanRequest = getAllLoanRequest;
exports.updateStatus = updateStatus;