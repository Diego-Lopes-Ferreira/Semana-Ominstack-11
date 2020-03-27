const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');
//config app
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;
/*
  Rota: Local, URL (tipo, até o .com)
  Recurso: Parte dentro da rota (algo dps da barra)

  HTTP:
    GET: Buscar/listar uma informação do Back-End (qd vc da enter)
    POST: Cria uma informação no Back-End
    PUT: altera uma informação no Back-End
    DELETE: Deleta uma informação no Back-End

  Tipos de Parâmetros:
    Query Params: Parametros (nomeados) após o simbolo "?" como filtros, paginacao, etc
    Route Params: Parametros pra pegar um elemento só
    Request Body: Corpo da requisicao
*/