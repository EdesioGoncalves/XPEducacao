import express from "express";
import winston from "winston";
import pedidosRouter from "./routes/pedido.routes.js";
import { promises as fs } from "fs";
import cors from "cors";

const { readFile, writeFile } = fs;

global.fileName = "pedidos.json";
//Wintons - início
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "delivery-api.log" }),
  ],
  format: combine(label({ label: "delivery-api" }), timestamp(), myFormat),
});
//Winston - Fim
const app = express(); // instancia o express
app.use(express.json()); //converte JSON
app.use(cors());
app.use("/pedido", pedidosRouter);
app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    logger.info("API Started!");
  } catch (err) {
    const initialJson = { // cria um array caso o arquivo não exista
      nextId: 1,
      pedidos: [],
    };
    writeFile(global.fileName,JSON.stringify(initialJson))
      .then(() => {
        logger.info("API Started and File Created!");
      })
      .catch((err) => {
        logger.error(err);
      });
    }
});