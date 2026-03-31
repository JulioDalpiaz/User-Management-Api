require("dotenv").config();
const express = require("express");
const publicRoutes = require("./routes/public.js")
const privateRoutes = require("./routes/private.js");
const auth = require("./middlewares/auth.js");

const app = express();
app.use(express.json()); //para o express entender o formato json

app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);

app.listen(3000, () => {
    console.log("rodando");
});