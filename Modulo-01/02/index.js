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

const app = express();
app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile("accounts.json");
    console.log("API Started!");
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: []
    }
    writeFile("accounts.json", JSON.stringify(initialJson)).then(() => {
      console.log("API Started and File Created!");
    }).catch(error => {
      console.log(error);
    });
  }
});