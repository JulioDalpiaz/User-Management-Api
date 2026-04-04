import { Router } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router(); //só importei o router do express
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const { sign } = jwt;

const JWT_SECRET = process.env.JWT_SECRET;

//Cadastro
router.post('/cadastro', async (req, res) => {
    const user = req.body;
    const passwordHash = await hash(user.password, 12); //precisa usar await

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

        const isMatch = await compare(userInfo.password, user.password)

        if(!isMatch){
            return res.status(400).json( {message: "Senha inválida!"})
        }

        //Gerar o token JWT
        const token = sign({ id: user.id }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        
        res.status(200).json(token);
    }catch(err){
        res.status(500).json({ message: "Erro no servidor, tente novamente!" });
    }
})

export default router;