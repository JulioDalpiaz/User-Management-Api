const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({ message: 'Acesso Negado! '})
    }
    next();
}

module.exports = auth;