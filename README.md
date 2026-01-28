# Starsoft - Marketplace de NFTs

Marketplace de NFTs desenvolvido com Next.js, React e TypeScript. Aplicação moderna e performática para compra e venda de produtos digitais com pagamento em Ethereum (ETH).

## 📋 Índice

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura e Estrutura](#-arquitetura-e-estrutura)
- [Decisões de Design](#-decisões-de-design)
- [Como Iniciar](#-como-iniciar)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Features Implementadas](#-features-implementadas)
- [Configuração de Ambiente](#-configuração-de-ambiente)
- [Docker](#-docker)
- [Testes](#-testes)

## 🛠 Tecnologias Utilizadas

### Core
- **Next.js 16.1.5** - Framework React com App Router para SSR e otimizações
- **React 19.2.3** - Biblioteca para construção de interfaces
- **TypeScript 5** - Tipagem estática para maior segurança de código

### Gerenciamento de Estado
- **Redux Toolkit 2.11.2** - Gerenciamento de estado global (carrinho de compras)
- **React Query (TanStack Query) 5.90.20** - Gerenciamento de estado do servidor e cache de dados

### Estilização
- **SASS 1.97.3** - Pré-processador CSS com variáveis e mixins
- **CSS Modules** - Estilos com escopo local por componente
- **Motion (Framer Motion) 12.29.2** - Animações fluidas e performáticas

### HTTP Client
- **Axios 1.13.4** - Cliente HTTP para requisições à API

### Testes
- **Jest 29.7.0** - Framework de testes
- **React Testing Library 14.3.1** - Utilitários para testes de componentes React
- **Jest DOM** - Matchers adicionais para testes de DOM

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para qualidade de código
- **Prettier** - Formatador de código
- **TypeScript** - Tipagem estática

## 🏗 Arquitetura e Estrutura

### Clean Architecture

A aplicação segue os princípios de **Clean Architecture**, separando as responsabilidades em camadas:

```
src/
├── app/                    # Camada de Apresentação (Next.js App Router)
├── components/             # Componentes React reutilizáveis
├── lib/                    # Bibliotecas e utilitários
│   └── api/               # Cliente HTTP (Axios)
├── services/              # Camada de Serviços (comunicação com API)
├── adapters/              # Camada de Adaptadores (transformação de dados)
├── use-cases/             # Casos de uso (lógica de negócio)
├── store/                 # Redux Store (estado global)
├── types/                 # Tipos TypeScript compartilhados
└── providers/             # Providers React (React Query, Redux)
```

### Fluxo de Dados

1. **Componente** → Chama `useCase` (hook)
2. **UseCase** → Chama `Service` para buscar dados da API
3. **Service** → Usa `ApiClient` (Axios) para fazer requisições HTTP
4. **Adapter** → Transforma dados da API para o formato do domínio
5. **UseCase** → Retorna dados transformados para o componente
6. **Componente** → Renderiza os dados

### Gerenciamento de Estado

- **Redux Toolkit**: Gerencia estado do carrinho (itens, total, aberto/fechado)
- **React Query**: Gerencia estado do servidor (produtos, cache, paginação)

## 💡 Decisões de Design

### 1. Separação de Responsabilidades

- **Services**: Responsáveis apenas por comunicação com API
- **Adapters**: Transformam dados da API para o formato do domínio
- **UseCases**: Contêm a lógica de negócio e orquestram Services e Adapters
- **Components**: Apenas apresentação, sem lógica de negócio

### 2. TypeScript em Toda a Aplicação

- Tipagem forte para maior segurança
- Interfaces para contratos (ex: `IApiClient`, `IProductService`)
- Tipos compartilhados em `src/types/`

### 3. CSS Modules + SASS

- Escopo local de estilos (evita conflitos)
- Variáveis SASS centralizadas em `_variables.scss`
- Breakpoints responsivos definidos como variáveis

### 4. Lazy Loading e Code Splitting

- Componentes pesados carregados sob demanda (`React.lazy`)
- Imagens com `loading="lazy"` para otimização
- Primeiras 4 imagens com `loading="eager"` (above the fold)

### 5. Performance e SEO

- Metadata API do Next.js para SEO
- Structured Data (JSON-LD) com Schema.org
- Open Graph e Twitter Cards
- Imagens otimizadas com Next.js Image
- Compressão e otimizações no `next.config.ts`

### 6. Acessibilidade

- ARIA labels em todos os elementos interativos
- Navegação por teclado (ESC para fechar modais)
- Roles semânticos (`role="dialog"`, `role="banner"`)
- Suporte a leitores de tela

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js 20 ou superior
- pnpm (recomendado) ou npm/yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd starsoft-app
```

2. Instale as dependências:
```bash
pnpm install
# ou
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` e adicione:
```env
NEXT_PUBLIC_API_URL=https://api-challenge.starsoft.games/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Execute o servidor de desenvolvimento:
```bash
pnpm dev
# ou
npm run dev
```

5. Acesse [http://localhost:3000](http://localhost:3000)

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento

# Build
pnpm build            # Cria build de produção
pnpm start            # Inicia servidor de produção

# Qualidade de Código
pnpm lint             # Executa ESLint
pnpm format           # Formata código com Prettier
pnpm format:check     # Verifica formatação sem alterar arquivos

# Testes
pnpm test             # Executa testes
pnpm test:watch       # Executa testes em modo watch
pnpm test:coverage    # Executa testes com cobertura
```

## 📁 Estrutura de Pastas

```
starsoft-app/
├── public/                 # Arquivos estáticos
│   ├── images/            # Imagens da aplicação
│   └── favicon.ico        # Favicon
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (dashboard)/   # Rota agrupada do dashboard
│   │   │   ├── page.tsx   # Página principal
│   │   │   └── page.module.scss
│   │   ├── layout.tsx     # Layout raiz
│   │   ├── globals.scss   # Estilos globais
│   │   └── _variables.scss # Variáveis SASS
│   ├── components/        # Componentes React
│   │   ├── Button/
│   │   ├── Cart/
│   │   ├── CartCard/
│   │   ├── Counter/
│   │   ├── EmptyState/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Icon/
│   │   ├── ImageWithLoading/
│   │   ├── ProductCard/
│   │   └── ProgressBar/
│   ├── lib/               # Bibliotecas e utilitários
│   │   └── api/          # Cliente HTTP
│   │       ├── client.ts # Instância Axios
│   │       ├── config.ts # Configuração da API
│   │       └── interfaces.ts # Contratos
│   ├── services/          # Serviços de API
│   │   └── product/
│   │       ├── product.service.ts
│   │       ├── interfaces/
│   │       └── types/
│   ├── adapters/          # Adaptadores de dados
│   │   └── product/
│   │       └── product.adapter.ts
│   ├── use-cases/         # Casos de uso
│   │   └── products/
│   │       └── get-all.use-case.ts
│   ├── store/             # Redux Store
│   │   ├── index.ts       # Configuração do store
│   │   ├── hooks.ts       # Hooks tipados
│   │   └── slices/
│   │       └── cart/      # Slice do carrinho
│   ├── types/             # Tipos TypeScript
│   │   └── product.types.ts
│   └── providers/         # Providers React
│       ├── react-query.provider.tsx
│       └── redux.provider.tsx
├── .env.local             # Variáveis de ambiente (não versionado)
├── .prettierrc            # Configuração Prettier
├── jest.config.ts         # Configuração Jest
├── jest.setup.js          # Setup dos testes
├── next.config.ts         # Configuração Next.js
├── tsconfig.json          # Configuração TypeScript
└── package.json           # Dependências e scripts
```

## ✨ Features Implementadas

### Funcionalidades Principais

- ✅ **Listagem de Produtos**: Grid responsivo com paginação infinita
- ✅ **Carrinho de Compras**: Adicionar, remover e atualizar quantidade
- ✅ **Sidebar do Carrinho**: Modal lateral com animação de slide
- ✅ **Busca e Filtros**: Ordenação por nome, preço, data (API)
- ✅ **Loading States**: Skeletons durante carregamento
- ✅ **Empty States**: Mensagens quando não há produtos
- ✅ **Animações**: Entrada suave dos cards com stagger effect
- ✅ **Responsividade**: Layout adaptável para mobile, tablet e desktop

### Otimizações

- ✅ **Lazy Loading**: Componentes pesados carregados sob demanda
- ✅ **Image Optimization**: Next.js Image com lazy loading
- ✅ **Code Splitting**: Separação automática de código
- ✅ **Cache**: React Query para cache de requisições
- ✅ **Performance**: Otimizações no Lighthouse

### Acessibilidade

- ✅ **ARIA Labels**: Todos os elementos interativos
- ✅ **Navegação por Teclado**: Suporte completo
- ✅ **Semântica HTML**: Uso correto de tags semânticas
- ✅ **Leitores de Tela**: Compatibilidade total

### SEO

- ✅ **Metadata**: Títulos, descrições e keywords
- ✅ **Open Graph**: Tags para redes sociais
- ✅ **Structured Data**: JSON-LD com Schema.org
- ✅ **Sitemap Ready**: Preparado para sitemap

## ⚙️ Configuração de Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL da API
NEXT_PUBLIC_API_URL=https://api-challenge.starsoft.games/api/v1

# URL do site (para metadata)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Importante**: Variáveis que começam com `NEXT_PUBLIC_` são expostas ao cliente.

## 🐳 Docker

O projeto inclui configuração Docker para facilitar o deploy:

### Build e Execução

```bash
# Usando Docker Compose (recomendado)
make up
# ou
docker-compose up --build

# Usando Makefile
make build    # Build da imagem
make up       # Inicia containers
make down     # Para containers
make logs     # Visualiza logs
```

### Dockerfile

- Multi-stage build para otimização
- Usuário não-root para segurança
- Build standalone do Next.js
- Porta 3000 exposta

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
pnpm test

# Modo watch (desenvolvimento)
pnpm test:watch

# Com cobertura
pnpm test:coverage
```

### Estrutura de Testes

- Testes unitários para componentes
- Testes de integração para hooks e use cases
- Mocks para dependências externas
- Cobertura de código configurada

### Configuração

- Jest configurado com `next/jest`
- React Testing Library para testes de componentes
- Mocks configurados em `jest.setup.js`

## 🎨 Design System

### Cores

```scss
$color-primary: #ff8310;      // Laranja principal
$color-dark: #232323;         // Fundo escuro
$color-darker: #191a20;       // Fundo mais escuro
$color-gray: #393939;         // Cinza médio
$color-light-gray: #cccccc;   // Cinza claro
$color-white: #ffffff;        // Branco
$color-black: #22232C;       // Preto
```

### Breakpoints

```scss
$breakpoint-xs: 480px;   // Mobile pequeno
$breakpoint-sm: 768px;   // Tablet
$breakpoint-md: 1024px;  // Desktop pequeno
$breakpoint-lg: 1280px;  // Desktop
$breakpoint-xl: 1440px;  // Desktop grande
```

### Tipografia

- **Fonte**: Poppins (Google Fonts)
- **Pesos**: 400, 500, 600, 700

## 📚 Conceitos Aplicados

### Clean Architecture
- Separação clara de responsabilidades
- Independência de frameworks
- Testabilidade

### SOLID Principles
- Single Responsibility: Cada classe/função tem uma responsabilidade
- Open/Closed: Extensível sem modificação
- Dependency Inversion: Dependências através de interfaces

### Design Patterns
- **Singleton**: `ApiConfig` para configuração única
- **Adapter**: Transformação de dados da API
- **Provider**: Context API para React Query e Redux
- **Factory**: Criação de instâncias do store

## 🔒 Segurança

- Variáveis de ambiente para dados sensíveis
- Validação de URLs da API
- Usuário não-root no Docker
- Headers de segurança configurados

## 📄 Licença

Este projeto foi desenvolvido como teste técnico.

## 👨‍💻 Desenvolvido com

- Next.js
- React
- TypeScript
- Redux Toolkit
- React Query
- SASS
- Docker

---

**Starsoft** - Marketplace de NFTs 🚀
