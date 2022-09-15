/*
* Responsável por receber, realizar as validações das requisições
* e dar as respostas para os usuários.
* Dispara as chamadas das regras de regócio.
*/

import AccountService from "../services/account.service.js";

// Implementação do método POST
async function createAccount(req, res, next) {
  try {
    // recebe parâmetro
    let account = req.body;
    // faz o tratamento
    if (!account.name || account.balance == null) {
      throw new Error("Name e Balance são obrigatórios.");
    }
    
    account = await AccountService.createAccount(account);
    res.send(account);
    logger.info(`POST /account - ${JSON.stringify(account)}`);

  } catch (err) {
    next(err);
  }
}

// Implementação do método GET
async function getAccounts( req, res, next) {
  try {
    res.send(await AccountService.getAccounts());
    logger.info("GET /account");
  } catch (err) {
    next(err);
  }
}

// Implementação do método GET por ID
async function getAccount(req, res, next) {
  try {
    res.send(await AccountService.getAccount(req.params.id));
    logger.info(`GET /account/:id`);
  } catch (err) {
    next(err);
  }
}

// Implementação do método DELETE
async function deleteAccount(req, res, next) {
  try {
    await AccountService.deleteAccount(req.params.id);
    res.end();
    logger.info(`DELETE /account/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

// Implementação do método PUT
async function updateAccount(req, res, next) {
  try {
    const account = req.body;

    // Valida a obrigatoriedade dos 2 campos
    if (!account.name || account.balance == null) {
      throw new Error("Name e Balance são obrigatórios.");
    }

    res.send(await AccountService.updateAccount(account));

    logger.info(`PUT /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
}

// Implementação do método PATCH
async function updateBalance(req, res, next) {
  try {
    const account = req.body;
    if (!account.id || account.balance == null) {
      throw new Error("Id e Balance são obrigatórios.");
    }

    res.send(await AccountService.updateBalance(account));

    logger.info(`PATCH /account/updateBalance - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createAccount,
  getAccounts,
  getAccount,
  deleteAccount,
  updateAccount,
  updateBalance
}