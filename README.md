# Starsoft Frontend Challenge

> Marketplace de NFTs desenvolvido como solução para o desafio técnico da Starsoft.

---

## Por que foi criado

Este projeto é a resposta ao **desafio técnico frontend da Starsoft**, com o objetivo de demonstrar habilidades em:

- Desenvolvimento de interfaces modernas com **React/Next.js**
- Arquitetura escalável baseada em **Clean Architecture**
- Gerenciamento de estado com **Redux Toolkit** e **React Query**
- Boas práticas de qualidade: testes, acessibilidade, SEO e performance
- Deploy containerizado com **Docker**

A aplicação simula um marketplace de NFTs onde usuários podem visualizar produtos, adicionar ao carrinho e gerenciar a quantidade de itens, com pagamento em **ETH (Ethereum)**.

---

## Solução

### Fluxo da Aplicação

```
Componente → UseCase (hook) → Service (Axios) → API
                    ↓
              Adapter (transforma dados)
                    ↓
              Componente renderiza
```

A listagem de produtos usa **paginação infinita** com carregamento progressivo. O carrinho é gerenciado globalmente via Redux, persistindo durante a sessão.

### Funcionalidades Implementadas

- **Listagem de produtos** — grid responsivo com paginação infinita e barra de progresso
- **Carrinho de compras** — sidebar com slide animation, adicionar/remover/atualizar quantidade
- **Loading states** — skeletons animados durante carregamento
- **Empty state** — mensagem visual quando não há produtos
- **PWA** — suporte offline com Service Worker e Web Manifest
- **Acessibilidade** — ARIA labels, navegação por teclado, suporte a leitores de tela
- **SEO** — Metadata API, Open Graph, Structured Data (JSON-LD)

---

## Stack

### Core

| Tecnologia                                   | Versão | Uso                            |
| -------------------------------------------- | ------ | ------------------------------ |
| [Next.js](https://nextjs.org)                | 16.1.5 | Framework React com App Router |
| [React](https://react.dev)                   | 19.2.3 | Construção de interfaces       |
| [TypeScript](https://www.typescriptlang.org) | 5      | Tipagem estática               |

### Estado e Dados

| Tecnologia                                    | Versão  | Uso                                   |
| --------------------------------------------- | ------- | ------------------------------------- |
| [Redux Toolkit](https://redux-toolkit.js.org) | 2.11.2  | Estado global do carrinho             |
| [TanStack Query](https://tanstack.com/query)  | 5.90.20 | Cache e estado do servidor (produtos) |
| [Axios](https://axios-http.com)               | 1.13.4  | Cliente HTTP                          |

### Estilização

| Tecnologia                    | Versão  | Uso                                        |
| ----------------------------- | ------- | ------------------------------------------ |
| [SASS](https://sass-lang.com) | 1.97.3  | Pré-processador CSS com variáveis e mixins |
| CSS Modules                   | —       | Escopo local de estilos por componente     |
| [Motion](https://motion.dev)  | 12.29.2 | Animações fluidas                          |

### Qualidade e Testes

| Tecnologia                                           | Versão | Uso                   |
| ---------------------------------------------------- | ------ | --------------------- |
| [Jest](https://jestjs.io)                            | 29.7.0 | Framework de testes   |
| [React Testing Library](https://testing-library.com) | 14.3.1 | Testes de componentes |
| [ESLint](https://eslint.org)                         | 9      | Linting               |
| [Prettier](https://prettier.io)                      | 3      | Formatação            |
| [Husky](https://typicode.github.io/husky)            | 9.1.7  | Pre-commit hooks      |

### Infraestrutura

| Tecnologia                       | Uso                                   |
| -------------------------------- | ------------------------------------- |
| [Docker](https://www.docker.com) | Containerização com multi-stage build |
| Docker Compose                   | Orquestração de containers            |

---

## Arquitetura

O projeto segue **Clean Architecture**, separando responsabilidades em camadas independentes:

```
src/
├── app/            # Apresentação — Next.js App Router (rotas e páginas)
├── components/     # Componentes React reutilizáveis
├── use-cases/      # Lógica de negócio (hooks com React Query)
├── services/       # Comunicação com API externa
├── adapters/       # Transformação de dados (API → domínio)
├── store/          # Estado global com Redux Toolkit
├── lib/            # Cliente HTTP (Axios) e utilitários
├── types/          # Tipos TypeScript compartilhados
└── providers/      # Providers React (Query, Redux)
```

**Por que Clean Architecture?**

- Cada camada tem uma única responsabilidade
- Fácil de testar de forma isolada
- Troca de implementações sem impactar outras camadas (ex: trocar Axios por fetch)

---

## Design System

**Fonte:** Poppins (400, 500, 600, 700)

**Paleta de cores:**

```
#ff8310  — Laranja (primary)
#232323  — Fundo escuro
#191a20  — Fundo mais escuro
#393939  — Cinza médio
#ffffff  — Branco
```

**Breakpoints:**

```
480px  — Mobile
768px  — Tablet
1024px — Desktop pequeno
1280px — Desktop
1440px — Desktop grande
```

---

Desenvolvido por **Lucas** como solução ao desafio técnico da Starsoft.
