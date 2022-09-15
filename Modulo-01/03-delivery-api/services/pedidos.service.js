import PedidoRepository from "../repositories/pedido.repository.js";

async function createPedido(pedido) {
  return await PedidoRepository.insertPedido(pedido);
}

async function getPedidos() {
  return await PedidoRepository.getPedidos();
}

async function getPedido(id) {
  return await PedidoRepository.getPedido(id);
}

async function deletePedido(id) {
  return await PedidoRepository.deletePedido(id);
}

async function updatePedido(pedido) {
  return await PedidoRepository.updatePedido(pedido);
}

async function updateEntregue(pedido) {
  const ped = await PedidoRepository.getPedido(pedido.id);
  ped.entregue = pedido.entregue;
  return await PedidoRepository.updatePedido(ped);
}

async function getTotalCliente(nomeCliente) {
  const pedidos = await PedidoRepository.getPedidos();
  const total = pedidos
    .filter((p) => p.cliente === nomeCliente && p.entregue)
    .map((p) => p.valor)
    .reduce((prev, curr) => prev + curr, 0);
  return total;
}

async function getTotalProduto(nomeProduto) {
  const pedidos = await PedidoRepository.getPedidos();
  const total = pedidos
    .filter((p) => p.produto === nomeProduto && p.entregue)
    .map((p) => p.valor)
    .reduce((prev, curr) => prev + curr, 0);
  return total;
}

async function getMaisPedidos() {
  const pedidos = await PedidoRepository.getPedidos();
  const lista = [];
  pedidos
    .filter((p) => p.entregue)
    .forEach((p) => {
      const index = lista.findIndex((it) => it.produto === p.produto);
      if (index === -1) {
        lista.push({ produto: p.produto, quantidade: 1 });
      } else {
        lista[index].quantidade++;
      }
    });
  lista.sort((a, b) => b.quantidade - a.quantidade);
  return lista;
}

export default {
  createPedido,
  getPedidos,
  getMaisPedidos,
  getPedido,
  deletePedido,
  updatePedido,
  updateEntregue,
  getTotalCliente,
  getTotalProduto
};