import express, {
  json
} from "express";
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
    const data = JSON.parse(await readFile("accounts.json"));
    console.log(data);

    account = {
      id: data.nextId++,
      ...account
    };
    data.accounts.push(account);

    await writeFile("accounts.json", JSON.stringify(data, null, 2));

    res.send(account);
  } catch (error) {
    res.status(400).send({
      error: error.message
    });
  }
});

export default router;