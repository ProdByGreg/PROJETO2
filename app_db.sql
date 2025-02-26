CREATE DATABASE app_db;

USE app_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (email, password, role) VALUES
('admin@admin.com', '1234', 'admin'),
('user@user.com', '1234', 'user');

SELECT * FROM users;
