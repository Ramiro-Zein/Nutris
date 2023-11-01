DROP DATABASE IF EXISTS Nutris;

CREATE DATABASE Nutris;

USE Nutris;

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL,
	fullname VARCHAR(50) NOT NULL,
);

CREATE TABLE links (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(25),
    url VARCHAR(150),
    descripcion VARCHAR(100),
    user_id INT(3)
);

CREATE TABLE Datos_user (
    id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_datos INT(3) NOT NULL,
    edad INT(2),
    sexo VARCHAR(10),
    peso DECIMAL(10,2),
    altura DECIMAL(10,2),
    tipo_cuerpo VARCHAR(20)
);

CREATE TABLE Rutina (
    id_rutina INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_rutina INT(3) NOT NULL,
    rutina_asignada VARCHAR(200),
    comentario_rutina VARCHAR(100)
);

CREATE TABLE Dieta (
    id_dieta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30)
);

SELECT * FROM users;

-- SOURCE D:\UBAM\Universidad\Cuarto Cuatrimestre\Metodología\Project_Node\Database\Database.sql