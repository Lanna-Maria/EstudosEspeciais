const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Buscar todos os itens do cardápio
const getAllMenuItems = async (req, res) => {
  try {
    const itens = await prisma.cardapio.findMany();
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os itens do cardápio' });
  }
};

// Adicionar itens ao cardápio
const addMenuItems = async (req, res) => {
  const { menuItems } = req.body;

  try {
    for (const categoria in menuItems) {
      const itens = menuItems[categoria];

      for (const nomeItem in itens) {
        const preco = itens[nomeItem];

        await prisma.cardapio.create({
          data: {
            nome: nomeItem,
            preco: preco,
            categoria: categoria,
          },
        });
      }
    }

    res.status(201).json({ message: 'Itens adicionados com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar itens', error);
    res.status(500).json({ error: 'Erro ao adicionar itens do cardápio' });
  }
};

// Atualizar item
const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { nome, preco, categoria } = req.body;

  try {
    const itemAtualizado = await prisma.cardapio.update({
      where: { id: parseInt(id) },
      data: { nome, preco, categoria },
    });

    res.status(200).json(itemAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar item', error);
    res.status(500).json({ error: 'Erro ao atualizar item do cardápio' });
  }
};

//  Remover item
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.cardapio.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).end(); // 👈 corrigido
  } catch (error) {
    console.error('Erro ao remover item', error);
    res.status(500).json({ error: 'Erro ao remover item do cardápio' });
  }
};

module.exports = {
  getAllMenuItems,
  addMenuItems,
  updateMenuItem,
  deleteMenuItem,
};
