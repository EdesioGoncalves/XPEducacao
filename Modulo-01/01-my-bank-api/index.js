import express from "express";
import winston from "winston";
import cors from "cors";

//import das rotas
import accountsRouter from "./router/account.router.js";
import { promises as fs } from "fs";

//gerador de documentação
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc.js";

const { readFile, writeFile } = fs;

//variáveis globais
global.fileName = "accounts.json";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: "my-bank-api.log" })
  ],
  format: combine(
    label({ label: "my-bank-api" }),
    timestamp(),
    myFormat)
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // Serve a pasta Public
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/account", accountsRouter); //definição das rotas do Express

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
