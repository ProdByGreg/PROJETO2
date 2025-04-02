CREATE DATABASE app_db;

USE app_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    Telefone VARCHAR(20) NOT NULL,
    CPF VARCHAR(14) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE preferencias_usuario (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    genero VARCHAR(10) NOT NULL,
    altura DECIMAL(5,2) NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    cores_preferidas TEXT,
    personalidade TEXT,
    estilo_roupa TEXT,
    identidade_visual TEXT,
    detalhes_favoritos TEXT,
    estampas_favoritas TEXT,
    sapatos_favoritos TEXT,
    acessorios_favoritos TEXT,
    pecas_favoritas TEXT
);


INSERT INTO users (nome, email, password, role, Telefone, CPF) VALUES
('Fernando','admin@admin.com', '1234', 'admin', '11987654321', '123.456.789-01');

SELECT * FROM users;
SELECT * FROM preferencias_usuario;