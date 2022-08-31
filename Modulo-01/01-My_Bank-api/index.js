import express from "express";
import accountsRouter from "./router/accounts.js";
import {
  promises as fs
} from "fs";

const {
  readFile,
  writeFile
} = fs;

const app = express(); //instância do express
app.use(express.json()); //avisa ao express do uso no JSON

app.use("/account", accountsRouter);

//inicializa na porta 3000 o server
app.listen(3000, async () => {
  try {
    await readFile("accounts.json");
    console.log("API Starded!");
  } catch (err) {
    const initialJson = {
      nextID: 1,
      acounts: []
    }
    writeFile("accounts.json", JSON.stringify(initialJson)).then(() => {
      console.log("API Starded and File Created!");
    }).catch(err => {
      console.log(err);
    });
  }
});