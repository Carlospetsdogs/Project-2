CREATE DATABASE login_db;
USE login_db;
CREATE TABLE user (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    userRoleId INT,
    UserFName VARCHAR(50),
    UserLName VARCHAR(50),
);