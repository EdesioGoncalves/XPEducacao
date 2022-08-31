import express from "express";
import {
  promises as fs
} from "fs";

const {
  readFile,
  writeFile
} = fs;

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile("accounts.json")); //lê o arquivo que simula a base de dados

    // atribui valores ao array
    account = {
      id: data.nextId,
      ...account
    };
    data.netId++;
    data.account.push(account);

    await writeFile("accounts.json", JSON.stringify(data));

    res.end();
  } catch (err) {
    res.status(400).send({
      error: err.message
    });
  }
});

export default router;