import "dotenv/config";
import express, { json } from "express";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
import auth from "./middlewares/auth.js";

const app = express();
app.use(json()); //para o express entender o formato json

app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);

app.listen(3000, () => {
    console.log("rodando");
});