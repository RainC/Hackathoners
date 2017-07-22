CREATE DATABASE hacka_server_db;
ALTER DATABASE hacka_server_db DEFAULT CHARACTER SET UTF8;
USE hacka_server_db;

CREATE TABLE 'Team' (
    'id' int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    'name' varchar(30) DEFAULT NULL,
    'members' varchar(20) DEFAULT NULL,
    'repos' varchar(10) DEFAULT NULL
) ENGINE=InnoDB;

CREATE TABLE 'Member' (
    'id' int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    'name' varchar(30) DEFAULT NULL,
    'phone' varchar(11) DEFAULT NULL,
    'email' varchar(40) DEFAULT NULL,
    'github' varchar(40) DEFAULT NULL,
    'group' varchar(40) DEFAULT NULL
) ENGINE=InnoDB;

CREATE TABLE 'Repository' (
    'id' int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    'username' varchar(40) DEFAULT NULL,
    'reponame' varchar(40) DEFAULT NULL,
    'commits' int(3) DEFAULT NULL
) ENGINE=InnoDB;
