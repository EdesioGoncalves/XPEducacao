import express, {
  json
} from "express";
import {
  promises as fs,
  write
} from "fs";

const {
  readFile,
  writeFile
} = fs;

const router = express.Router();

// Implementação do método POST
router.post("/", async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    console.log(data);

    account = {
      id: data.nextId++,
      ...account
    };
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (error) {
    res.status(400).send({
      error: error.message
    });
  }
});

// Implementação do método GET
router.get("/", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
  } catch (error) {
    res.status(400).send({
      error: error.mensage
    });
  }
});

// Implementação do método GET por ID
router.get("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(account => account.id === parseInt(req.params.id));
    res.send(account);
  } catch (error) {
    res.status(400).send({
      error: error.mensage
    });
  }
});

// Implementação do método DELETE
router.delete("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    // Filtra a base retirando o id encontrado
    data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id));

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.end();
  } catch (error) {
    res.status(400).send({
      error: error.message
    });
  }
});

export default router;