import express from "express";
import winston from "winston";
import cors from "cors";
import basicAuth from "express-basic-auth";

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

// Autenticação - npm install express-basic-auth
app.use(basicAuth({
  authorizer: (username, password) => {
    const userMatches = basicAuth.safeCompare(username, 'admin');
    const pwdMatches = basicAuth.safeCompare(password, 'admin');
    
    const user2Matches = basicAuth.safeCompare(username, 'angelo');
    const pwd2Matches = basicAuth.safeCompare(password, '1234');

    return userMatches && pwdMatches || user2Matches && pwd2Matches;
  }
}));

function getRole(username) {
  if (username == 'admin') {
    return 'admin'
  } else if (username == 'angelo') {
    return 'role1'
  }
}

function authorize(...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1;
  return (req, res, next) => {
    if (req.auth.user) {
      const role = getRole(req.auth.user);

      if (isAllowed(role)) {
        next();
      } else {
        res.status(401).send("Role not allowed.");
      }
    } else {
      res.status(403).send("User not found.");
    }
  }
}

app.use("/account", authorize('admin', 'role1'), accountsRouter); //definição das rotas do Express

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
