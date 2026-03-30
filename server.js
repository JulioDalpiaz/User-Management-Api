const express = require("express");
const publicRoutes = require("./routes/public.js")

const app = express();
app.use(express.json()); //para o express entender o formato json

app.use('/', publicRoutes);

app.get('/', (req, res) => {
    
})

app.listen(3000, () => {
    console.log("rodando");
});