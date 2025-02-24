const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuração do servidor
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Seu usuário do MySQL
  password: '07151128220tT@', // Sua senha do MySQL
  database: 'app_db'
});

// Verificação de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Campos obrigatórios não informados.' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro no servidor.' });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const user = results[0];

    // Verificando a senha
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Erro ao comparar senha.' });

      if (!isMatch) {
        return res.status(401).json({ message: 'Senha incorreta.' });
      }

      res.status(200).json({ message: 'Login bem-sucedido!', role: user.role });
    });
  });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
