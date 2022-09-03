import { promises as fs } from "fs";

// Destructor das funções do File System
const { readFile, writeFile } = fs;

async function createAccount(req, res, next) {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error("Name e Balance são obrigatórios.")
    }

    const data = JSON.parse(await readFile(global.fileName));
    console.log(data);

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance
    };
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);

    logger.info(`POST /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createAccount
}