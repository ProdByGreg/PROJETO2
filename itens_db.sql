CREATE DATABASE Pizzaria;

USE Pizzaria;

-- Tabela de Sabores
CREATE TABLE Sabores (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL
);

-- Tabela de Refrigerantes
CREATE TABLE Refrigerantes (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL
);

-- Inserção de dados na tabela Sabores
INSERT INTO Sabores (Nome) VALUES
('Calabresa'),
('Margherita'),
('Quatro Queijos'),
('Frango com Catupiry'),
('Portuguesa');

-- Inserção de dados na tabela Refrigerantes
INSERT INTO Refrigerantes (Nome) VALUES
('Coca-Cola'),
('Guaraná'),
('Fanta Laranja'),
('Sprite');

-- Consulta para verificar os dados
SELECT * FROM Sabores;
SELECT * FROM Refrigerantes;