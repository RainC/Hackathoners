CREATE DATABASE hacka_server_db;
ALTER DATABASE hacka_server_db DEFAULT CHARACTER SET UTF8;
USE hacka_server_db;

CREATE TABLE `Teams` (
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` varchar(30) DEFAULT NULL,
    `members` varchar(20) DEFAULT NULL,
    `repos` varchar(10) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `Members` (
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` varchar(30) DEFAULT NULL,
    `phone` varchar(11) DEFAULT NULL,
    `email` varchar(40) DEFAULT NULL,
    `github` varchar(40) DEFAULT NULL,
    `group` varchar(40) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `Repositories` (
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` varchar(40) DEFAULT NULL,
    `reponame` varchar(40) DEFAULT NULL,
    `commits` int(3) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `Commits` (
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `sha` varchar(40) DEFAULT NULL,
    `committer` varchar(40) DEFAULT NULL,
    `timestamp` varchar(25) DEFAULT NULL,
    `reponame` varchar(40) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;
