const express = require("express");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma");

const router = express.Router(); //só importei o router do express
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

router.get('/listar-usuarios', async (req, res) => {
    try{
        const users = await prisma.user.findMany( {omit: {password: true } });

        res.status(200).json({ message: "Usuários listados com sucesso!", users });
    }catch(err){
        res.status(500).json({ message: "Falha no servidor!" });
    }
});

module.exports = router;