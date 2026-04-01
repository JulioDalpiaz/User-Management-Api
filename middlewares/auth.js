const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({ message: 'Acesso Negado! '});
    }

    try{
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET); //o replace é para retirar a palavra "Bearer " do token, caso ela exista
        req.user = decoded;
        next(); //deixar dentro do try por segurança
    }catch(err){
        return res.status(401).json({ message: 'Token Inválido!' });
    }
}

module.exports = auth;