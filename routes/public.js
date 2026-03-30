const express = require("express");
const router = express.Router(); //só importei o router do express

//Cadastro
router.post('/cadastro', (req, res) => {
    const user = req.body;

    res.status(201).json(user);
});

module.exports = router;