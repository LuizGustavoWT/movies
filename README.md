# Movies

## Requisitos

- Node.js 22.11

## Rodar o Projeto

1. Instale as dependências:
```sh
npm install
```
2. Para iniciar o servidor de desenvolvimento, execute:
```sh
npm start
```

3. Para Executar os testes, execute:
```sh
npm run test
```

O projeto estará disponível em `http://localhost:3000`.

## Endpoints

- `GET /api/awards-interval`: Retorna o intervalo de prêmios.

## Estrutura do Projeto

- `src/`: Contém o código-fonte do projeto.
- `src/database.js`: Contém a função que lê o arquivo CSV inicia o DB em SQLite.
- `src/route.js`: Contém as rotas da aplicação.
- `src/app.js`: Contém a configuração do servidor.
- `src/controllers/`: Contém os controladores da aplicação.
- `tests/`: Contém os testes do projeto.
- `data/`: Contém o arquivo CSV `movielist`.

## Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento.
- `npm run test`: Executa os testes.
