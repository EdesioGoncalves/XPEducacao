/*
* Responsável por obter e encaminhar as requisições 
*/

import express from "express";
import AccountController from "../controllers/account.controller.js";

// Instância do router
const router = express.Router();

// Roteamente de acordo com as caminhos
router.post("/", AccountController.createAccount); // passa a função como parâmetro e o próprio router é quem executa
router.get("/", AccountController.getAccounts);
router.get("/:id", AccountController.getAccount);
router.delete("/:id", AccountController.deleteAccount);
router.put("/", AccountController.updateAccount);
router.patch("/updateBalance", AccountController.updateBalance);

// Tratamento de erro (usado ao final do código para captar os erros passados em todos os métodos)
router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ erro: err.message });
});

export default router;
