const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar pedidos
const getDashboardPedidos = async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      orderBy: {
        criadoEm: 'desc',
      },
    });

    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
};

// Criar pedido
const createPedido = async (req, res) => {
  const { cliente, itens } = req.body;

  try {
    const itensArray =
      typeof itens === 'string'
        ? itens.split(',').map((item) => ({
            nome: item.trim(),
            preco: 0,
            quantidade: 1,
          }))
        : itens || [];

    const total = itensArray.reduce(
      (acc, item) => acc + (item.preco || 0) * (item.quantidade || 1),
      0,
    );

    const pedido = await prisma.pedido.create({
      data: {
        nomeCliente: cliente,
        numeroMesa: '1',
        itens: itensArray,
        precoTotal: total,
        status: 'Pendente',
      },
    });

    res.json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
};

// Atualizar status
const updatePedidoStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const pedido = await prisma.pedido.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json(pedido);
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
};

module.exports = {
  getDashboardPedidos,
  updatePedidoStatus,
  createPedido,
};
