CREATE DATABASE login_db;
USE login_db;
CREATE TABLE user (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    userRoleId INT,
    UserFName VARCHAR(50),
    UserLName VARCHAR(50),
    email VARCHAR(50),
);
CREATE TABLE userLogin (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    loginName VARCHAR(50),
    loginPassword VARCHAR(50)
    
);
CREATE TABLE userRole (
    userRoleId INT AUTO_INCREMENT PRIMARY KEY,
    roleName VARCHAR(50)
);
CREATE TABLE userLoginRole (
    userId INT,
    userRoleId INT
);