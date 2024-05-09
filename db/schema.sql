DROP DATABASE IF EXISTS login_db;
CREATE DATABASE login_db;
USE login_db;

CREATE TABLE profile (
    `id` INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    `firstName` VARCHAR(50) DEFAULT NULL,
    `lastName` VARCHAR(50) DEFAULT NULL,
    `phoneNumber` VARCHAR(50) DEFAULT NULL,
    `zip` INT (6),
    `city` VARCHAR(50)DEFAULT NULL,
    `state` VARCHAR(50)DEFAULT NULL
);

CREATE TABLE userLogin (
    `userId` INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    `userRoleId` INT(1) NOT NULL,
    `emailAddress` VARCHAR(50) DEFAULT NULL,
    `password` VARCHAR(50) DEFAULT NULL
);

-- Table for projects 
CREATE TABLE projects (
    `projectId` INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    `userId` INT NOT NULL,
    `project_name` VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES userLogin(userId)
);

-- table for project categories
CREATE TABLE project_categories (
    categoryId INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    categoryName VARCHAR(255) UNIQUE NOT NULL
);
INSERT INTO project_categories (categoryName) VALUES 
('Plumbing'),
('Carpentry'),
('Electrical'),
('HVAC');
