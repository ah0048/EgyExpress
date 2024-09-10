-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS egyexp_db;
CREATE USER IF NOT EXISTS 'egyexp_admin'@'localhost' IDENTIFIED BY '123123';
GRANT ALL PRIVILEGES ON `egyexp_db`.* TO 'egyexp_admin'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'egyexp_admin'@'localhost';
FLUSH PRIVILEGES;
