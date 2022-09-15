import brandRouter from "./routes/brands.js";
import express from "express";

const app = express();

app.use("/marcas", brandRouter);

// abre o navegaador na porta 3000
app.listen(3000, () => console.log("API Started!"));