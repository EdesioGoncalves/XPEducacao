import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const router = express.Router();

// Implementação do método POST
router.post("/", async (req, res, next) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    console.log(data);

    account = { id: data.nextId++, ...account };
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);

    logger.info(`POST /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

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
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    data.accounts[index] = account;

    await writeFile(global.fileName, JSON.stringify(data));

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

    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data));

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
