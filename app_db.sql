CREATE DATABASE app_db;

USE app_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    Telefone VARCHAR(20) NOT NULL, -- Nova coluna para o telefone
    CPF VARCHAR(14) NOT NULL,      -- Nova coluna para o CPF
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (nome, email, password, role, Telefone, CPF) VALUES
('Fernando','admin@admin.com', '1234', 'admin', '11987654321', '123.456.789-01');

SELECT * FROM users;