CREATE DATABASE user_management;

CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    age INT(3),
    gender ENUM('Femenino', 'Masculino', 'Otro'),
    bio TEXT,
    birth DATE,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIME
);


