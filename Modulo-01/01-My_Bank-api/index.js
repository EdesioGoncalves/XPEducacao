// import { Express } from "express";
import express from "express";
import accountsRouter from "./router/accounts.js";
import {
  promises as fs
} from "fs";

const {
  readFile,
  writeFile
} = fs;

//variável global com o nome do arquivo que simula a base de dados
global.fileName = "accounts.json";

const app = express();
app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    console.log("API Started!");
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: []
    }
    writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
      console.log("API Started and File Created!");
    }).catch(error => {
      console.log(error);
    });
  }
});