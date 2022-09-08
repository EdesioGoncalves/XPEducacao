import express from "express";
const app = express();
app.use(express.json());

import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;

global.nomeArquivo = "pedidos2.json";

async function getData() {
  const data = await readFile(global.nomeArquivo);
  return JSON.parse(data);
}

app.get("/pedidos", async (req, res) => {
  const data = await getData();
  res.send(data);
});

// Endpoint - Criar pedido
app.post("/pedidos", async (req, res) => {
  let pedido = req.body;

  if(!pedido.cliente || !pedido.produto || pedido.valor == null) {
    throw new Error("Cliente, produto e valor precisam ser preenchidos!");
  }

  const data = await getData();
  pedido = {
    id: data.nextId++,
    cliente: pedido.cliente,
    produto: pedido.produto,
    valor: pedido.valor,
    entregue: false,
    timestamp: new Date()
  };
  data.pedidos.push(pedido);
  await writeFile(global.nomeArquivo, JSON.stringify(data, null, 2));

  res.send(pedido);
});

// Endpoint - Atualizar pedido
app.get("/pedidos/:id", async (req, res) => {
  try {
    // let pedido = req.body;
    const data = getData();
    const pedido = data.pedidos.find(
      (e) => e.id === parseInt(req.params.id)
    );
    //const index = data.pedidos.findIndex((e) => e.id === pedido.id);

    console.log(pedido);
    res.send(pedido);
  } catch (err) {
    console.log(`Erro: ${err} .!?`);
  }
});

app.listen(3000, () => console.log("API Started!"));
