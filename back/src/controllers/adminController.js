const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const adminLogin = async (req, res) => {
  const { email, senha } = req.body;

  // Logs para debug (ver o que está chegando na requisição)
  console.log('BODY:', req.body);
  console.log('EMAIL DIGITADO:', `[${email}]`);
  console.log('SENHA DIGITADA:', `[${senha}]`);

  // Validação: verifica se email e senha foram enviados
  if (!email || !senha) {
    return res.status(400).json({
      error: 'Email e senha são obrigatórios',
    });
  }

  try {
    // Busca o administrador no banco pelo email
    const admin = await prisma.administrador.findUnique({
      where: {
        // Remove espaços e garante que o email esteja em minúsculo
        email: email.trim().toLowerCase(),
      },
    });

    console.log('ADMIN DO BANCO:', admin);

    if (!admin) {
      return res.status(401).json({
        error: 'Administrador não encontrado',
      });
    }

    console.log('SENHA DO BANCO:', `[${admin.senha}]`);

    // Compara a senha digitada com a senha do banco
    // trim() remove espaços extras antes/depois
    if (admin.senha.trim() !== senha.trim()) {
      return res.status(401).json({
        error: 'Credenciais inválidas',
      });
    }

    return res.json({
      message: 'Login realizado com sucesso',
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Erro no servidor',
    });
  }
};

module.exports = {
  adminLogin,
};
