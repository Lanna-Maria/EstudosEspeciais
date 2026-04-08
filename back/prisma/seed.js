const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.administrador.create({
    data: {
      email: 'admin@admin.com',
      senha: '123',
    },
  });

  console.log('Admin criado com sucesso');
}

main()
  .catch((e) => {
    console.error('Erro ao criar seed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
