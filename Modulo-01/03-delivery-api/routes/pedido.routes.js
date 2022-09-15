import express from "express";
import PedidoController from "../controllers/pedido.controller.js";

const router = express.Router();

router.post("/", PedidoController.createPedido);
router.get("/", PedidoController.getPedidos);
router.get("/maisPedidos", PedidoController.maisPedidos);
router.get("/:id", PedidoController.getPedido);
router.delete("/:id", PedidoController.deletePedido);
router.put("/", PedidoController.updatePedido);
router.patch("/updateEntregue", PedidoController.updateEntregue);
router.post("/totalCliente", PedidoController.totalCliente);
router.post("/totalProduto", PedidoController.totalProduto);

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
})

export default router;