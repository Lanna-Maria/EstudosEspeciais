# Estudos Especiais – Café Gourmet (CG) ☕

[![CI](https://github.com/Lanna-Maria/EstudosEspeciais/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Lanna-Maria/EstudosEspeciais/actions/workflows/ci.yml)
[![Deploy Front](https://github.com/Lanna-Maria/EstudosEspeciais/actions/workflows/deploy-front.yml/badge.svg?branch=main)](https://github.com/Lanna-Maria/EstudosEspeciais/actions/workflows/deploy-front.yml)
[![Deploy Back](https://github.com/Lanna-Maria/EstudosEspeciais/actions/workflows/deploy-back.yml/badge.svg?branch=main)](https://github.com/Lanna-Maria/EstudosEspeciais/actions/workflows/deploy-back.yml)

Projeto web de uma cafeteria, com backend em Node.js/Express, frontend em React e banco de dados PostgreSQL gerenciado com Prisma.

---

## Descrição

Projeto desenvolvido durante a disciplina de Estudos Especiais (Gerência e Configuração de Software) - 2026.1 da UFC.

### 👩‍💻 Grupo da Pós-graduação (Equipe B)

| Matrícula | Nome |
|-----------|------|
| 597157 | [Tadeu dos Santos Jerônimo](https://github.com/tadeujeronimo) |
| 597159 | [Lanna Maria Ibiapina da Silva Mesquita](https://github.com/Lanna-Maria) |
| 602690 | [Ynã de Queiroz Ponte](https://github.com/ynaponte) |
| 608616 | [Alanna Maria Machado Alves Paiva](https://github.com/alannapaiva) |

## 🎯 Funcionalidades

- **Gerenciamento de Cardápio**: Adicionar, editar e remover itens do menu
- **Pedidos**: Criar, visualizar e gerenciar pedidos com status em tempo real
- **Dashboard**: Visualizar e atualizar status dos pedidos pelo painel administrativo
- **Autenticação de Admin**: Login seguro com JWT para administradores
- **Gestão de Forma de Pagamento e Entrega**: Rastreamento de pedidos por endereço, com suporte a troco
- **Documentação de API**: Swagger UI disponível para explorar os endpoints

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** com **Express 5**
- **Prisma ORM** para gerenciamento de banco de dados
- **PostgreSQL** como banco de dados
- **JSON Web Token (jsonwebtoken)** para autenticação via JWT
- **bcrypt** para hash seguro de senhas
- **swagger-autogen** + **swagger-ui-express** para documentação automática da API
- **CORS** para controle de origem
- **Jest** para testes, com **fast-check** para testes baseados em propriedades

### Frontend
- **React 19** com **React Router v6**
- **React Bootstrap** para componentes UI
- **Axios** para requisições HTTP
- **Bootstrap 5** para estilização
- **@testing-library/react** para testes de componentes

## 🔐 Segurança

- Autenticação de administrador com **JWT** (JSON Web Token)
- Senhas protegidas com hash via **bcrypt**
- CORS configurado para controle de origem cruzada
- Validações de integridade garantidas pelo schema do Prisma

## 📁 Estrutura Resumida do Projeto

```
EstudosEspeciais/
├── back/                    # Backend - API Express
│   ├── src/
│   │   ├── controllers/     # Controladores da aplicação
│   │   └── routes/          # Rotas da API
│   ├── prisma/
│   │   ├── schema.prisma    # Schema do banco de dados
│   │   └── migrations/      # Histórico de migrações
│   ├── tests/               # Testes
│   └── package.json
├── front/                   # Frontend - React
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas principais
│   │   ├── services/        # Serviços de API
│   │   ├── dashboard/       # Páginas do dashboard
│   │   └── App.test.js      # Testes
│   └── package.json
├── docs/                    # Documentação do projeto
├── .github/workflows/       # Workflows de CI e deploy
├── LICENSE
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v20+)
- PostgreSQL instalado e rodando
- npm ou yarn

### Instalação do Backend (Desenvolvimento Local)

> **⚠️ IMPORTANTE: Diferença entre Local e Docker**
> - **Para rodar com Docker**: Não crie uma variável `DATABASE_URL` no `.env` da raiz, pois o Docker Compose montará a URL automaticamente para você a partir das credenciais do postgres. Além disso, o Dockerfile do backend já inclui as ferramentas de compilação C++ (`make`, `gcc`, etc) necessárias para que a biblioteca `bcrypt` instale nativamente no Alpine Linux.
> - **Para rodar Local (sem Docker)**: Siga as instruções abaixo e utilize o arquivo `back/.env`.

```bash
cd back
npm install
```

Crie um arquivo `.env` na pasta `back` copiando o `back/.env.example` e preenchendo:

```env
# Utilize localhost para rodar sem Docker
DATABASE_URL="postgresql://cafeteria:cafeteria123@localhost:5432/cafeteria_db"
PORT=4000
JWT_SECRET="sua_chave_secreta"
USE_LOCAL_STORAGE=true
```

Aplique as migrações:
```bash
npx prisma migrate dev
```

#### 🌱 Seed (dados iniciais)

Para popular o banco com dados de exemplo:
```bash
npx prisma db seed
```

Isso criará:
- **Administrador padrão**: `admin@admin.com` / senha: `123`

> **Nota sobre Falhas no Seed**: O script de seed (`seed.js`) possui tratamento de erro explícito com `process.exit(1)`. Caso a biblioteca `bcrypt` falhe (ex: rodando em uma imagem Alpine limpa sem compiladores) ou o banco não esteja pronto, o erro será exposto imediatamente e impedirá o sistema de subir num estado defeituoso.

(Opcional) Gere a documentação Swagger:
```bash
npm run swagger
```

Inicie o servidor:
```bash
npm run dev    # Desenvolvimento com nodemon
npm start      # Produção
```

O backend rodará em `http://localhost:4000` por padrão.
A documentação Swagger estará disponível em `http://localhost:4000/api-docs`.

---

### Executando via Docker Compose

Para subir toda a infraestrutura de uma vez (Postgres, Backend e Frontend):

1. Na **raiz** do projeto, crie o `.env` (copiando `.env.example`). Deixe apenas as variáveis básicas, **sem** `DATABASE_URL`.
2. O repositório já contém um `.gitattributes` forçando a quebra de linha `LF` nos scripts (como `entrypoint.sh`). Se você usa Windows, isso evita falhas bizarras no carregamento do entrypoint por conta das quebras de linha `CRLF`.
3. Rode:
```bash
docker compose up --build -d
```

### Instalação do Frontend

```bash
cd front
npm install
```

Crie um arquivo `.env` na pasta `front` com:

```env
REACT_APP_API_URL=http://localhost:4000
```

Inicie o servidor de desenvolvimento:
```bash
npm start
```

O frontend abrirá em `http://localhost:3000` por padrão.

## 💻 Scripts Disponíveis

### Backend
- `npm run dev` — Inicia o servidor em modo desenvolvimento (nodemon)
- `npm start` — Inicia o servidor em produção
- `npm run swagger` — Gera a documentação Swagger (`swagger.json`)
- `npm test` — Executa os testes com Jest
- `npm run vercel-build` — Gera o Prisma Client para deploy no Vercel

### Frontend
- `npm start` — Inicia o servidor de desenvolvimento
- `npm run build` — Cria build otimizado para produção
- `npm test` — Executa os testes com React Testing Library

## 🌐 Deploy

O projeto é publicado no **Vercel** por meio de GitHub Actions, com validação de testes antes de cada deploy.
Os arquivos `vercel.json` em `front/` e `back/` mantêm a configuração de cada aplicação.

| Serviço | URL |
|---------|-----|
| Frontend | https://cafe-gourmet-front.vercel.app |
| Backend (API) | https://cafe-gourmet-back.vercel.app |

## ⚙️ Workflows (GitHub Actions)

O repositório possui três workflows automatizados, todos rodando em **Node.js 20** com Ubuntu:

### CI (`.github/workflows/ci.yml`)
Acionado em `push` e `pull_request` para a branch `main`.
- **Test Frontend**: instala dependências, garante que `react-router-dom` está disponível e executa os testes sem modo watch.
- **Test Backend**: instala dependências e executa os testes com Jest.

Os dois jobs rodam em paralelo, com cada um operando dentro de seu respectivo diretório (`front/` ou `back/`).

### Deploy Frontend (`.github/workflows/deploy-front.yml`)
Acionado em `push` para a branch `main`.
- Executa os **testes do frontend** primeiro (job `test`).
- Só realiza o **deploy no Vercel** (job `deploy`) se os testes passarem (`needs: test`).
- Usa concorrência com `group: deploy-frontend` para evitar deploys simultâneos (sem cancelar o em andamento).

### Deploy Backend (`.github/workflows/deploy-back.yml`)
Acionado em `push` para a branch `main`.
- Executa os **testes do backend** primeiro (job `test`).
- Só realiza o **deploy no Vercel** (job `deploy`) se os testes passarem (`needs: test`).
- Usa concorrência com `group: deploy-backend` para evitar deploys simultâneos.

Os workflows de deploy requerem os seguintes secrets configurados no repositório:
- `VERCEL_TOKEN` — Token de autenticação do Vercel
- `VERCEL_ORG_ID` — ID da organização no Vercel
- `VERCEL_PROJECT_ID_FRONT` — ID do projeto frontend no Vercel
- `VERCEL_PROJECT_ID_BACK` — ID do projeto backend no Vercel

## 🔌 Rotas da API

A base da API em produção é `https://cafe-gourmet-back.vercel.app/api`.

### Admin
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `POST` | `/admin/login` | ❌ | Login do administrador; retorna token JWT |
| `GET` | `/admin/dashboard` | ✅ JWT | Verifica acesso autorizado do admin |

### Cardápio
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `GET` | `/cardapio` | ❌ | Lista todos os itens do cardápio |
| `GET` | `/cardapio/:id` | ❌ | Retorna um item pelo ID |
| `POST` | `/cardapio` | ✅ JWT | Adiciona novo item |
| `PUT` | `/cardapio/:id` | ✅ JWT | Atualiza item existente |
| `DELETE` | `/cardapio/:id` | ✅ JWT | Remove um item do cardápio |

### Dashboard
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `GET` | `/dashboard` | ✅ JWT | Retorna pedidos para o painel administrativo |
| `PUT` | `/dashboard/:id` | ✅ JWT | Atualiza o status de um pedido |

### Pedidos
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `POST` | `/pedidos` | ❌ | Cria um novo pedido |
| `GET` | `/pedidos` | ❌ | Lista todos os pedidos |

## 📊 Modelagem de Dados

### Administrador
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|:-----------:|-----------|
| `id` | Int | ✅ | ID único (autoincremento) |
| `email` | String | ✅ | Email único |
| `senha` | String | ✅ | Senha criptografada com bcrypt |
| `criadoEm` | DateTime | ✅ | Data de criação |

### Cardápio
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|:-----------:|-----------|
| `id` | Int | ✅ | ID único (autoincremento) |
| `nome` | String | ✅ | Nome do item |
| `preco` | Float | ✅ | Preço do item |
| `categoria` | String | ✅ | Categoria |
| `descricao` | String | ❌ | Descrição do item |
| `criadoEm` | DateTime | ✅ | Data de criação |

### Pedido
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|:-----------:|-----------|
| `id` | Int | ✅ | ID único (autoincremento) |
| `nomeCliente` | String | ✅ | Nome do cliente |
| `itens` | JSON | ✅ | Lista de itens do pedido |
| `precoTotal` | Float | ✅ | Preço total calculado |
| `status` | String | ✅ | Status do pedido — padrão `"Pendente"` (ex.: `"Em Preparo"`, `"Pronto"`, `"Entregue"`) |
| `formaPagamento` | String | ❌ | Forma de pagamento (`dinheiro`, `pix`, `debito`, `credito`) |
| `tipoPedido` | String | ❌ | Tipo (`retirada` ou `entrega`) |
| `rua` | String | ❌ | Rua para entrega |
| `numero` | String | ❌ | Número para entrega |
| `bairro` | String | ❌ | Bairro para entrega |
| `precisaTroco` | Boolean | ❌ | Se o cliente precisa de troco |
| `trocoPara` | Float | ❌ | Valor para o qual dar troco (apenas quando `formaPagamento = dinheiro`) |
| `observacoes` | String | ❌ | Observações adicionais |
| `criadoEm` | DateTime | ✅ | Data de criação |

## 📚 Documentação Adicional

Veja a pasta [`docs/`](docs/) para informações sobre configurações e requisitos do projeto.

## 📄 Licença

[MIT](LICENSE)