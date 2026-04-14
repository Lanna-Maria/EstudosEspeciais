# Lista de Itens de Configuração

## Item de Configuração: Documentação do Projeto

- **ID:** IC-001
- **Tipo:** Documentação
- **Versão:** 1.0.0
- **Repositório:** [GitHub](https://github.com/Lanna-Maria/EstudosEspeciais)
- **Branch:** main
- **Commit ID:** f1aec80885d2fcbc0bbea7fd6bdff957f49e7962
- **Mudanças:** Estruturação do `README.md` com orientações de configuração e execução do projeto.
- **Data Release:** 13/04/2026

## Item de Configuração: Configuração de Dependências e Build Backend

- **ID:** IC-002
- **Tipo:** Dependências e builds
- **Versão:** 1.0.0
- **Repositório:** [GitHub](https://github.com/Lanna-Maria/EstudosEspeciais)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Versionamento de bibliotecas, scripts e configuração de build/deploy. Arquivos: `package.json`, `package-lock.json`.
- **Data Release:** 07/04/2026

## Item de Configuração: Aplicação Express

- **ID:** IC-003
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub](https://github.com/Lanna-Maria/EstudosEspeciais)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Configuração de middleware, CORS, JSON e roteamento base /api. Arquivos: `app.js`.
- **Data Release:** 07/04/2026

## Item de Configuração: Inicialização do Servidor

- **ID:** IC-004
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub](https://github.com/Lanna-Maria/EstudosEspeciais)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Porta de execução e bootstrap do backend. Arquivos: server.js.
- **Data Release:** 07/04/2026

## Item de Configuração: Modelo de Dados (Persistência Prisma)

- **ID:** IC-005
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub](https://github.com/Lanna-Maria/EstudosEspeciais)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Definição dos modelos, dados iniciais e acesso ao banco via Prisma. Arquivos: `schema.prisma`, `seed.js`, `prismaClient.js`.
- **Data Release:** 07/04/2026

## Item de Configuração: Rotas da API

- **ID:** IC-006
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub](https://github.com/Lanna-Maria/EstudosEspeciais)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Centralização das rotas de cardápio, pedidos, admin e dashboard. Arquivos: `routes/index.js`, `adminRoutes.js`, `pedidosRoutes.js`.
- **Data Release:** 07/04/2026

## Item de Configuração: Controller de Pedidos

- **ID:** IC-007
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub](https://github.com/Lanna-Maria/EstudosEspeciais)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Regras de negócio para criação, consulta e atualização de pedidos. Arquivos: `pedidosController.js`.
- **Data Release:** 07/04/2026

# Item de Configuração: Regras de Versionamento (Gitignore)

- **ID**: IC-008
- **Tipo**: Configuração de Infraestrutura
- **Versão**: 1.0.0
- **Repositório:** [GitHub](https://github.com/Lanna-Maria/EstudosEspeciais)
- **Branch**: main
- **Commit ID**: 322b5a38ddb52029c92b7e6901ce02a041919c58
- **Mudanças**: Definição da listagem de exclusão em todas as camadas (`node_modules`, pastas de log e env) blindando o repositório.
- **Data Release**: 08/04/2026

# Item de Configuração: Configuração de Dependências Frontend

- **ID**: IC-009
- **Tipo**: Configuração de Software
- **Versão**: 1.0.0
- **Repositório:** [GitHub](https://github.com/Lanna-Maria/EstudosEspeciais)
- **Branch**: main
- **Commit ID**: 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças**: Registro imutável de versão (via `package-lock.json` e `package.json`) das libs utilizadas no Frontend (ex: React dom, Router, Web Vitals).
- **Data Release**: 07/04/2026

## Item de Configuração: Núcleo da Interface

- **ID:** IC-010
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub](https://github.com/Lanna-Maria/EstudosEspeciais)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Estrutura principal da aplicação, inicialização no DOM e proteção de rotas administrativas. Arquivos: `App.js`, `src/index.js`, `PrivateRoute.jsx`.
- **Data Release:** 07/04/2026

## Item de Configuração: Telas Funcionais (Interface de Usuário)

- **ID:** IC-011
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub](https://github.com/Lanna-Maria/EstudosEspeciais)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Interface de pedidos e dashboard administrativo para operação e gestão. Arquivos: `Pedidos.jsx`, `Dashboard.jsx`.
- **Data Release:** 07/04/2026

## Item de Configuração: Testes Automatizados

- **ID:** IC-012
- **Tipo:** Testes
- **Versão:** 1.0.0
- **Repositório:** [GitHub](https://github.com/Lanna-Maria/EstudosEspeciais)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Cobertura inicial de renderização e validação básica da interface. Arquivos: `App.test.js`, `setupTests.js`.
- **Data Release:** 07/04/2026