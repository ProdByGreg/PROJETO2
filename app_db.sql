CREATE DATABASE app_db;

USE app_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL
);
INSERT INTO users (email, password, role) VALUES ('admin@teste.com', 'admin123', 'admin');
INSERT INTO users (email, password, role) VALUES ('usuario@teste.com', 'usuario123', 'user');
