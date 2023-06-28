const User = require("../models/user");

const getUserById = async(req, res, next) => {
 await User.findById({});

 res.status(200).json({username: username, name: name, email: email, number: number})
}

exports.getUserById = getUserById;