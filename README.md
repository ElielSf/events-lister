<h1 align="center">
  Sistema de Gestão de Eventos
</h1>

<p align="center">
  Uma aplicação full-stack para criação e gerenciamento de eventos, composta por uma API RESTful em Node.js e uma interface web em React.
</p>

---

## 📜 Índice

*   [✨ Sobre o Projeto](#-sobre-o-projeto)
*   [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
*   [📦 Estrutura do Projeto](#-estrutura-do-projeto)
*   [⚙️ Como Executar](#️-como-executar)
    *   [Pré-requisitos](#pré-requisitos)
    *   [Configurando o Backend (API)](#configurando-o-backend-api)
    *   [Configurando o Frontend (Web)](#configurando-o-frontend-web)
*   [🌐 Endpoints da API](#-endpoints-da-api)

---

## ✨ Sobre o Projeto

O **Sistema de Gestão de Eventos** é uma plataforma desenvolvida para facilitar a organização e o acesso a eventos. A aplicação permite que usuários criem eventos protegidos por senha, gerenciem categorias e métodos de pagamento.

A arquitetura é dividida em duas partes principais:

1.  **API (Backend):** Construída com Node.js e Express, responsável por toda a lógica de negócio, autenticação e comunicação com o banco de dados.
2.  **Web (Frontend):** Uma interface de usuário moderna e reativa, desenvolvida com React e Vite, para interagir com a API.

### Funcionalidades Principais

- **Gerenciamento de Eventos:** CRUD completo (Criar, Ler, Atualizar, Desativar) para eventos.
- **Acesso Seguro:** Eventos podem ser protegidos por senha. O acesso é liberado via token JWT.
- **Gerenciamento de Categorias:** CRUD para categorias de eventos.
- **Gerenciamento de Métodos de Pagamento:** CRUD para formas de pagamento.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

| Tecnologia | Descrição |
| :--- | :--- |
| **Node.js** | Ambiente de execução para o JavaScript no servidor. |
| **Express.js** | Framework para a construção da API RESTful. |
| **React** | Biblioteca para a construção da interface de usuário. |
| **Vite** | Ferramenta de build para um desenvolvimento frontend rápido. |
| **MySQL** | Banco de dados relacional para armazenamento dos dados. |
| **JSON Web Tokens (JWT)** | Para autenticação segura e controle de acesso aos eventos. |
| **Bcrypt** | Para hashing e segurança das senhas dos eventos. |

---

## 📦 Estrutura do Projeto

O projeto é um monorepo organizado da seguinte forma:

```
/
├── api/         # Contém todo o código do backend (Node.js/Express)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   └── package.json
│
└── web/         # Contém todo o código do frontend (React/Vite)
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── ...
    └── package.json
```

---

## ⚙️ Como Executar

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
*   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
*   [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
*   Um servidor de banco de dados [MySQL](https://www.mysql.com/) rodando.

### Configurando o Backend (API)

```bash
# 1. Clone o repositório
git clone https://github.com/ElielSf/events-lister.git

# 2. Navegue até a pasta da API
cd events-lister/api

# 3. Instale as dependências
npm install

# 4. Crie um arquivo .env na raiz da pasta 'api' e configure as variáveis de ambiente
# (use o arquivo .env.example como base)

# 5. Execute as migrações ou o script SQL para criar as tabelas no banco de dados

# 6. Inicie o servidor da API
npm run dev
```

### Configurando o Frontend (Web)

```bash
# 1. Em um novo terminal, navegue até a pasta web
cd events-lister/web

# 2. Instale as dependências
npm install

# 3. Crie um arquivo .env na raiz da pasta 'web' para definir a URL da API
# Ex: VITE_API_URL=http://localhost:3333

# 4. Inicie a aplicação React
npm run dev
```

Acesse `http://localhost:5173` (ou a porta indicada pelo Vite) no seu navegador.

---

## 🌐 Endpoints da API

A seguir estão os principais endpoints disponíveis na API:

#### Eventos (`/events`)
- `GET /events`: Lista todos os eventos ativos.
- `POST /events`: Cria um novo evento.
- `PUT /events/:id`: Atualiza um evento existente.
- `DELETE /events/:id`: Desativa um evento.
- `POST /events/:id/access`: Libera o acesso a um evento protegido, retornando um token JWT.

#### Categorias (`/categories`)
- `GET /categories`: Lista todas as categorias.
- `POST /categories`: Cria uma nova categoria.
- `PUT /categories/:id`: Atualiza uma categoria.
- `DELETE /categories/:id`: Desativa uma categoria.

#### Métodos de Pagamento (`/payments`)
- `GET /payments`: Lista todos os métodos de pagamento.
- `POST /payments`: Cria um novo método de pagamento.
- `PUT /payments/:id`: Atualiza um método de pagamento.
- `DELETE /payments/:id`: Desativa um método de pagamento.

