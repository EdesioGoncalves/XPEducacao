import express from "express";
import { promises as fs } from "fs";
import AccountController from "../controllers/account.controller.js";

const { readFile, writeFile } = fs;

const router = express.Router();

// Implementação do método POST
router.post("/", AccountController.createAccount); // passa a função como parâmetro e o POST é quem executa

// Implementação do método GET
router.get("/", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);

    logger.info(`GET /account`);
  } catch (err) {
    next(err);
  }
});

// Implementação do método GET por ID
router.get("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(account);

    logger.info(`GET /account/:id`);
  } catch (err) {
    next(err);
  }
});

// Implementação do método DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    // Filtra a base retirando o id encontrado
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.end();

    logger.info(`DELETE /account/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

// Implementação do método PUT
router.put("/", async (req, res, next) => {
  try {
    const account = req.body;

    // Valida a obrigatoriedade dos 2 campos
    if (!account.name || account.balance == null) {
      throw new Error("Name e Balance são obrigatórios.");
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (index === -1) {
      throw new Error("Registro não encontrado.");
    }

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);

    logger.info(`PUT /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

// Implementação do método PATCH
router.patch("/updateBalance", async (req, res, next) => {
  try {
    const account = req.body;

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (!account.id || account.balance == null) {
      throw new Error("Id e Balance são obrigatórios.");
    }

    if (index === -1) {
      throw new Error("Registro não encontrado.");
    }

    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data.accounts[index]);

    logger.info(`PATCH /account/updateBalance - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

// Tratamento de erro (usado ao final do código para captar os erros passados em todos os métodos)
router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ erro: err.message });
});

export default router;
