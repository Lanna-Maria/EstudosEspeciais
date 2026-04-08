const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar pedido
const createPedido = async (req, res) => {
  try {
    const {
      nomeCliente,
      itens,
      formaPagamento,
      tipoPedido,
      rua,
      numero,
      bairro,
      precisaTroco,
      trocoPara,
      observacoes,
    } = req.body;

    // Validação básica
    if (!nomeCliente || !itens || itens.length === 0) {
      return res.status(400).json({
        error: 'Preencha os dados obrigatórios',
      });
    }

    //  Calcular total
    const precoTotal = itens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0,
    );

    // TRATAMENTO DO TROCO
    let trocoConvertido = null;

    if (precisaTroco === true || precisaTroco === 'true') {
      const valor = Number(trocoPara);

      if (!isNaN(valor) && valor > 0) {
        trocoConvertido = valor;
      }
    }

    // Criar novo pedido
    const novoPedido = await prisma.pedido.create({
      data: {
        nomeCliente,
        itens,
        precoTotal,
        formaPagamento,
        tipoPedido,
        rua,
        numero,
        bairro,
        precisaTroco: precisaTroco === true || precisaTroco === 'true',
        trocoPara: trocoConvertido,
        observacoes,
      },
    });

    res.status(201).json(novoPedido);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({
      error: 'Erro ao criar pedido',
    });
  }
};

// Listar pedidos
const getAllPedidos = async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      orderBy: { id: 'desc' },
    });

    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({
      error: 'Erro ao buscar pedidos',
    });
  }
};

// Deletar pedido
const deletePedido = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.pedido.delete({
      where: { id: Number(id) },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar pedido:', error);
    res.status(500).json({
      error: 'Erro ao deletar pedido',
    });
  }
};

module.exports = {
  createPedido,
  getAllPedidos,
  deletePedido,
};
