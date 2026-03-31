const express = require("express");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router(); //só importei o router do express
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const JWT_SECRET = process.env.JWT_SECRET;

//Cadastro
router.post('/cadastro', async (req, res) => {
    const user = req.body;
    const passwordHash = await bcrypt.hash(user.password, 12); //precisa usar await

    try{
        const userDB = await prisma.user.create({
            data:{
                email: user.email,
                name: user.name,
                password: passwordHash,
            },
        });
        res.status(201).json(userDB);
    }catch (err){
        res.status(500).json({ message: "Erro no servidor, tente novamente!" });
    }
});

//Login
router.post('/login', async (req, res) => {
    try{
        const userInfo = req.body;

        const user = await prisma.user.findUnique({  //Encontra um usuario no banco de dados
            where: { email: userInfo.email }
        });

        if(!user){
            return res.status(404).json( {message: "Usuário não encontrado!"});
        }

        const isMatch = await bcrypt.compare(userInfo.password, user.password)

        if(!isMatch){
            return res.status(400).json( {message: "Senha inválida!"})
        }

        //Gerar o token JWT
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        
        res.status(200).json(token);
    }catch(err){
        res.status(500).json({ message: "Erro no servidor, tente novamente!" });
    }
})

module.exports = router;