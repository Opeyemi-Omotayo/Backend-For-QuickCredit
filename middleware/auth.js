const jwt = require("jsonwebtoken");

const verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    if(!token){
        return res.status(401).send("Access Denied / Unauthorized request");
    }

    try {
        token = token.split(' ')[1] 

        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');

        let verifiedUser = jwt.verify(token, process.env.JWT_KEY);  
        if (!verifiedUser) return res.status(401).send('Unauthorized request');
        req.user = verifiedUser; 
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }

}

const IsUser = async (req, res, next) => {
    if (req.user.role === "customer") {
      return next();
    }
    return res.status(401).send("Unauthorized!");   
}

const IsAdmin = async (req, res, next) => {
    if (req.user.role === 'admin') {
       return next();
    }
    return res.status(401).send("Unauthorized!");
}

const IsUserOrAdmin = async (req, res, next) => {
    if (req.user.role === "customer" || req.user.role === 'admin') {
       return next();
    }
    return res.status(401).send("Unauthorized!");
}

exports.verifyUserToken = verifyUserToken;
exports.IsUser = IsUser;
exports.IsAdmin = IsAdmin;
exports.IsUserOrAdmin = IsUserOrAdmin;