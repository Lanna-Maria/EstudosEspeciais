# Estudos Especiais - Café Gourmet

Aplicação web full stack para gestão de cafeteria, com backend em Node.js/Express, frontend em React e banco de dados PostgreSQL gerenciado com Prisma.

## Sobre o Projeto

Projeto desenvolvido durante a disciplina de Estudos Especiais (Gerência e Configuração de Software) - 2026.1 da UFC.

### Grupo (pós-graduação):

- 597157 Tadeu dos Santos Jerônimo
- 597159 Lanna Maria Ibiapina da Silva Mesquita
- 602690 Ynã de Queiroz Ponte
- 608616 Alanna Maria Machado Alves Paiva

## Funcionalidades principais

- Exibição do cardápio por categorias.
- Criação de pedidos com retirada ou entrega.
- Login e painel administrativo para acompanhamento dos pedidos.

## Tecnologias

- Node.js
- Express
- Prisma
- PostgreSQL
- React
- React Router
- React Bootstrap
- Axios

## Como executar

### 1. Configurar variáveis de ambiente

No diretório back, crie um arquivo .env:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomebanco?schema=public"
PORT=4000
```

No diretório front, crie um arquivo .env:

```env
REACT_APP_API_URL=http://localhost:4000
```

### 2. Instalar dependências e preparar banco

```bash
cd back
npm install
npx prisma generate
npx prisma migrate dev
npm run seed
```

```bash
cd front
npm install
```

### 3. Iniciar aplicação

```bash
cd back
node server.js
```

```bash
cd front
npm start
```

- Back-end: http://localhost:4000
- Front-end: http://localhost:3000

### 4. Credenciais iniciais

O seed cria um administrador padrão:

- Email: admin@admin.com
- Senha: 123