import PedidoService from "../services/pedidos.service.js";

async function createPedido(req, res, next) {
  try {
    let pedido = req.body;
    if (!pedido.cliente || !pedido.produto || pedido.valor == null) {
      throw new Error("Cliente, Produto e Valor são obrigatórios.");
    }
    pedido = await PedidoService.createPedido(pedido);
    res.send(pedido);
    logger.indo(`POST /pedido - ${JSON.stringify(pedido)}`);
  } catch (err) {
    next(err);
  }
}

async function getPedidos(req, res, next) {
  try {
    res.send(await PedidoService.getPedidos());
    logger.info("GET /pedido")
  } catch (err) {
    next(err);
  }
}

async function getPedido(req, res, next) {
  try {
    if (!req.params.id) {
      throw new Error("ID é obrigatório.");
    }
    res.send(await PedidoService.getPedido(req.params.id));
    logger.info("GET /pedido/:id");
  } catch (err) {
    next(err);
  }
}

async function deletePedido(req, res, next) {
  try {
    if (!req.params.id) {
      throw new Error("ID é obrigatório.");
    }
    await PedidoService.deletePedido(req.params.id)
    res.end();
    logger.info(`DELETE /pedido/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function updatePedido(req, res, next) {
  try {
    const pedido = req.body;
    if(
      !pedido.id ||
      !pedido.cliente ||
      !pedido.produto ||
      pedido.valor == null ||
      pedido.entregue == null
    ) {
      throw new Error(
        "Id, Cliente, Produto, Valor e Entregue são obrigatórios."
      );
    }
    res.send(await PedidoService.updatePedido(pedido));
    logger.info(`PUT /pedido - ${JSON.stringify(pedido)}`);
  } catch (err) {
    next(err);
  }
}

async function updateEntregue(req, res, next) {
  try {
    const pedido = req.body;

    if (!pedido.id || pedido.entregue == null) {
      throw new Error("Id e Entregue são obrigatórios.");
    }
    res.send(await PedidoService.updateEntregue(pedido));
    logger.info(`PATCH /pedido/updateEntregue - ${JSON.stringify(pedido)}`);
  } catch (err) {
    next(err);
  }
}

async function totalCliente(req, res, next) {
  try {
    const nomeCliente = req.body.cliente;
    if (!nomeCliente) {
      throw new Error("Cliente não informado.");
    }
    res.send({
      totalCliente: await PedidoService.getTotalCliente(nomeCliente),
    });
    logger.info("POST /pedido/totalCliente - " + nomeCliente);
  } catch (err) {
    next(err);
  }
}

async function totalProduto(req, res, next) {
  try {
    const nomeProduto = req.body.produto;
    if (!nomeProduto) {
      throw new Error("Produto não informado.");
    }
    res.send({
      totalProduto: await PedidoService.getTotalProduto(nomeProduto),
    });
    logger.info("POST /pedido/totalProduto - " + nomeProduto);
  } catch (err) {
    next(err);
  }
}

async function maisPedidos(req, res, next) {
  try {
    res.send(await PedidoService.getMaisPedidos());
    logger.info("GET /maisPedidos");
  } catch (err) {
    next(err);
  }
}

export default {
  createPedido,
  getPedidos,
  maisPedidos,
  getPedido,
  deletePedido,
  updatePedido,
  updateEntregue,
  totalCliente,
  totalProduto
};