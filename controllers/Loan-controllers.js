const Loan = require("../models/loan");
const ErrorMsg = require("../models/Error");

const loanRequest = async (req, res, next) => {
  const { loan_amount, duration_in_days, status } = req.body;
  const { userId, username } = req.user;

  const repayable_amount = loan_amount + duration_in_days * 10;
  const created_at = new Date();
  const createdLoanRequest = new Loan({
    loan_amount,
    duration_in_days,
    repayable_amount,
    userId,
    username,
    created_at,
    status,
  });

  try {
    await createdLoanRequest.save();
  } catch (err) {
    const error = new ErrorMsg(
      "Loan Request failed, please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ loanId: createdLoanRequest.id, status: createdLoanRequest.status });
};

const getAllLoanRequest = async (req, res, next) => {
  let users;
  try {
    users = await Loan.find({}, "-__v").where('status').equals('pending').sort({'created_at' : -1});
  } catch (err) {
    const error = new ErrorMsg(
      "Fetching Loan Requests failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const updateStatus = async (req, res, next) => {
  const { status } = req.body;
  const requestId = req.params.rid;

  let loanRequest;
  try {
    loanRequest = await Loan.findById(requestId);
  } catch (err) {
    const error = new ErrorMsg("Unable to find loan requests", 500);
    return next(error);
  }

  //loanRequest.status = status
  const LoanStatus = {
    APPROVAL: "APPROVED",
    REJECTED: "REJECTED",
    PENDING: "PENDING",
  };

  if (LoanStatus.APPROVAL == status) {
    
    loanRequest.status = LoanStatus.APPROVAL;
  } else if (LoanStatus.REJECTED == status) {
   
    loanRequest.status = LoanStatus.REJECTED;
  } else if (LoanStatus.PENDING == status) {
    loanRequest.status = LoanStatus.PENDING;
  } else {
    const error = new ErrorMsg(
      "Invalid status!.Accepted values are APPROVED, PENDING AND REJECTED",
      400
    );
    return next(error);
  }

  try {
    await loanRequest.save();
  } catch (err) {
    const error = new ErrorMsg(
      "Something went wrong, could not update request.",
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ loanRequest: loanRequest.toObject({ getters: true }) });
};


const getUserLoanId = async (req, res, next) => {
  const userId = req.params.id;

  let retrievedLoanRequest;
  try {
    //user = await Loan.find((user) => user.userId === userId);
    retrievedLoanRequest = await Loan.findById(userId);
  } catch (err) {
    const error = new ErrorMsg(
      'Fetching user by id failed, please try again later.',
      500
    );
    return next(error);
  }


  res.json({ status : retrievedLoanRequest.status});

};

exports.loanRequest = loanRequest;
exports.getAllLoanRequest = getAllLoanRequest;
exports.updateStatus = updateStatus;
exports.getUserLoanId = getUserLoanId;
