# Índice

* [Instalação](#-instalação)
* [Descrição](#descrição)
* [Funcionalidades](#funcionalidades)
* [Acessos](#-acessos)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Autor](#autor)
# MVP-Arquitetura-de-Software

# 🎲 Instalação

Clonar o repositório do frontend e do backend na mesma pasta do computador utilizando
```
mkdir "meu-projeto"
cd meu-projeto
git clone https://github.com/MatheusPiaia/MVP-arq-software-frontend.git frontend
git clone https://github.com/MatheusPiaia/MVP-arq-software-backend.git backend
```
Garantir que o projeto fique no padrão:
```
meu-projeto/
├── backend/
└── frontend/
```
Acessar então a pasta frontend e executar:
```
cd frontend
docker compose up --build
```
Esse comando irá:
- Subir o FrontEnd

Abra o http://localhost:5173 no navegador para acessar a homepage da aplicação. 

Abra o http://localhost:5000 no navegador para verificar a documentação da API em execução

Após a segunda execução seguir:
```
cd frontend
docker compose up -d
```

# Descrição
Aplicação frontend desenvolvida em React + Typescript como MVP para a Sprint de Arquitetura de Software.

Aplicação possui o objetivo de facilitar controle de estoque e de condicionais de uma loja de roupas online.

Abaixo segue arquitetura utilizada:
![arquitetura](https://github.com/user-attachments/assets/ff57b81d-75aa-4e95-8acb-358a5b94237a)


Foi utilizada a API externa da FakeStore para obter os produtos de exemplo da loja online

# 🌐 Acessos
-Frontend:
http://localhost:5173

-Backend (API):
http://localhost:5000

-Swagger:
http://localhost:5000/swagger

-PgAdmin:
http://localhost:5050

# Funcionalidades
- [x] Cadastro de Clientes
- [x] Importação dos produtos pela FakeStore
- [x] Módulo de controle de estoque
- [x] Cadastro de condicionais
- [x] Adição de itens aos condicionais
- [x] Retorno dos condicionais, informando produtos devolvidos e comprados
- [x] Lógica controle de estoque para atualização em tempo real
- [x] Filtros dinâmicos
- [x] UI Mobile e Desktop
- [ ] Adição manual de novos produtos
- [ ] Autenticação

Após a Execução do frontend é possível acessar a homepage da aplicação e verificar/testar todas as funcionalidades.
Abaixo segue telas da aplicação
<img width="1903" height="942" alt="image" src="https://github.com/user-attachments/assets/b3f8153e-ca4f-4347-b2dd-b584a8a89b06" />
<img width="1917" height="941" alt="image" src="https://github.com/user-attachments/assets/10cd485c-3cbd-452e-ab83-76cacc1f4e95" />
<img width="1900" height="941" alt="image" src="https://github.com/user-attachments/assets/dbb1211a-642b-4aea-b641-160a2ca128df" />
<img width="1917" height="940" alt="image" src="https://github.com/user-attachments/assets/a36d0d9e-5720-40ef-b6ff-795176146cc7" />
<img width="1909" height="947" alt="image" src="https://github.com/user-attachments/assets/3e425206-3571-4ada-8ff4-80e87c220932" />
<img width="1917" height="944" alt="image" src="https://github.com/user-attachments/assets/1be679a3-a4e9-426f-bf7c-86ddd844bdae" />
<img width="1917" height="940" alt="image" src="https://github.com/user-attachments/assets/5e68f2ff-cc40-400d-9ee3-dd5ddcbbdfbe" />




# 🛠 Tecnologias utilizadas
- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Material UI (MUI)](https://mui.com/material-ui/)
- [Docker](https://www.docker.com/)


# Autor
---

<a href="https://github.com/MatheusPiaia">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/185968337?s=400&u=b4f54f3c5ea4b83b959d508547adf7077fd2caf8&v=4" width="100px;" alt=""/>
 <br/></a> 

 [![GitHub](https://badgen.net/badge/icon/github?icon=github&label)](https://github.com/MatheusPiaia)
 [![LinkedIn](https://img.shields.io/badge/LinkedIn-Matheus-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/matheus-piaia-231647144)
