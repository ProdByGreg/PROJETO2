const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'app_db',
});

db.connect((err) => {
  if (err) {
    console.error('Erro na conexão com o banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Rota de Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Requisição recebida:', { email, password });

  if (!email || !password) {
    console.log('Campos obrigatórios faltando:', { email, password });
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  console.log('Executando consulta:', query, [email, password]);

  db.execute(query, [email, password], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    console.log('Resultados da consulta:', results);

    if (results.length === 0) {
      console.log('Credenciais inválidas para:', { email });
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = results[0];
    console.log('Usuário encontrado:', user);

    res.status(200).json({ role: user.role });
  });
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/Login');
});