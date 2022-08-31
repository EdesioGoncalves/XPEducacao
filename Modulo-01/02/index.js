// import { Express } from "express";
import express from "express";
import accountsRouter from "./router/accounts.js";

const app = express();
app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, () => {
  console.log("API Started!");
});