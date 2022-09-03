// import { Express } from "express";
import express from "express";
import accountsRouter from "./router/accounts.js";
import { promises as fs } from "fs";
import winston from "winston";

const { readFile, writeFile } = fs;
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

//variáveis globais
global.fileName = "accounts.json";
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-bank-api.log" }),
  ],
  format: combine(label({ label: "my-bank-api" }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use("/account", accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    global.logger.info("API Started!");
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        global.logger.info("API Started and File Created!");
      })
      .catch((err) => {
        global.logger.error(err);
      });
  }
});
