# SoloLife

## Descrição do Sistema

O **SoloLife** é uma plataforma web para **gestão e organização da vida cotidiana de jovens que moram sozinhos**, com foco em ajudar no planejamento de tarefas domésticas, eventos pessoais e controle de compras, facilitando a rotina e promovendo autonomia.

### Funcionalidades Principais:

#### Autenticação de Usuários:

* Registro e login seguro de usuários com validação e gerenciamento de sessões.
* Senhas criptografadas para garantir a segurança dos dados.

#### Gerenciamento de Eventos:

* Criação, edição, listagem e exclusão de eventos pessoais.
* Definição de datas, horários e lembretes para os eventos.

#### Controle de Afazeres Domésticos:

* Cadastro e organização de tarefas domésticas com data e horário definidos.
* Marcação do status das tarefas (pendente, em andamento, concluída).

#### Lista de Compras e Itens Faltantes:

* Criação de listas personalizadas de itens para compra.
* Organização e controle do que precisa ser adquirido.

#### Anotações Pessoais e de Refeições:

* Área para anotações livres e planejamento de refeições.

### Diferenciais do SoloLife:

* Interface intuitiva e responsiva, acessível via dispositivos móveis e desktop.
* Sistema pensado para ajudar jovens a se organizarem de forma simples e prática.
* Funcionalidades integradas para cobrir diferentes aspectos da rotina doméstica.

---

## Arquitetura

O SoloLife utiliza uma arquitetura MVC (Model-View-Controller), promovendo a separação clara das responsabilidades:

* **Model:** Responsável pela lógica de dados e interação com o banco de dados PostgreSQL.
* **View:** Renderização da interface utilizando templates EJS, garantindo uma experiência visual consistente e responsiva.
* **Controller:** Processamento das requisições, controle do fluxo da aplicação e comunicação entre Model e View.

O banco de dados é gerenciado com o pacote `pg` para Node.js, incluindo scripts de migração que criam e atualizam as tabelas conforme necessário.

---

## Estrutura de Pastas e Arquivos

A estrutura do projeto está organizada para facilitar manutenção, escalabilidade e colaboração:

```
sololife/
├── src/
│   ├── config/
│   │   └── database.js             # Configuração da conexão com PostgreSQL
│   ├── migrations/
│   │   └── migrate.js             # Scripts de migração para criação das tabelas
│   ├── models/
│   │   ├── user.js                # Modelo de usuários
│   │   ├── event.js               # Modelo para eventos
│   │   ├── task.js                # Modelo para afazeres domésticos
│   │   ├── shoppingItem.js        # Modelo para itens de compra
│   │   └── note.js                # Modelo para anotações
│   ├── controllers/
│   │   ├── userController.js      # Controlador para autenticação e usuários
│   │   ├── eventController.js     # Controlador para gerenciamento de eventos
│   │   ├── taskController.js      # Controlador para afazeres domésticos
│   │   ├── shoppingController.js  # Controlador para lista de compras
│   │   └── noteController.js      # Controlador para anotações
│   ├── routes/
│   │   ├── userRoutes.js          # Rotas para autenticação e usuários
│   │   ├── eventRoutes.js         # Rotas para eventos
│   │   ├── taskRoutes.js          # Rotas para afazeres
│   │   ├── shoppingRoutes.js      # Rotas para lista de compras
│   │   └── noteRoutes.js          # Rotas para anotações
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.ejs           # Layout principal
│   │   ├── user/
│   │   │   ├── login.ejs          # Página de login
│   │   │   └── register.ejs       # Página de registro
│   │   ├── event/
│   │   │   ├── list.ejs           # Listagem de eventos
│   │   │   ├── create.ejs         # Criar evento
│   │   │   └── edit.ejs           # Editar evento
│   │   ├── task/
│   │   │   ├── list.ejs           # Listagem de tarefas
│   │   │   ├── create.ejs         # Criar tarefa
│   │   │   └── edit.ejs           # Editar tarefa
│   │   ├── shopping/
│   │   │   ├── list.ejs           # Listagem de itens de compra
│   │   │   ├── create.ejs         # Criar item
│   │   │   └── edit.ejs           # Editar item
│   │   ├── note/
│   │   │   ├── list.ejs           # Listagem de anotações
│   │   │   ├── create.ejs         # Criar anotação
│   │   │   └── edit.ejs           # Editar anotação
│   └── server.js                  # Ponto de entrada da aplicação
├── public/
│   └── styles.css                 # Arquivo CSS principal
├── .env                           # Variáveis de ambiente
└── package.json                   # Dependências e scripts
```

---

## Tecnologias Utilizadas

* **Node.js** com **Express** para backend.
* **PostgreSQL** para banco de dados relacional.
* **EJS** para renderização de templates no frontend.
* **bcrypt** para criptografia de senhas.
* **dotenv** para gerenciamento de variáveis de ambiente.
* **Nodemon** para desenvolvimento com reload automático.

---

## Como Executar o Projeto Localmente

### Pré-requisitos

* Node.js (v16+)
* PostgreSQL (v12+)
* Editor de código (ex: VS Code)
* Navegador moderno

### Passos para configuração:

1. **Clone o repositório:**

```bash
git clone https://github.com/seu_usuario/sololife.git
cd sololife
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```env
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=sololife
DB_PASSWORD=sua_senha
DB_PORT=5432
PORT=3000
SESSION_SECRET=chave_secreta_para_sessao
```

Substitua pelos seus dados.

4. **Execute as migrações para criar as tabelas no banco:**

```bash
npm run migrate
```

5. **Inicie o servidor:**

```bash
npm start
```

Acesse a aplicação via `http://localhost:3000`.

---

## Documentação das Rotas e Funcionalidades

Todas as rotas e endpoints estão documentados no arquivo `documents/wad.md` para facilitar o desenvolvimento e manutenção.

