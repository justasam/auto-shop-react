-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: oldvolkshome
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.19.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` varchar(36) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` char(64) NOT NULL,
  `type` enum('employee','customer','admin') NOT NULL,
  `owner_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `ix_employee_account_username` (`username`),
  KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('0322af3e-fc00-11e9-8f0b-362b9e155667','admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','admin','');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `admin_v_accounts`
--

DROP TABLE IF EXISTS `admin_v_accounts`;
/*!50001 DROP VIEW IF EXISTS `admin_v_accounts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `admin_v_accounts` AS SELECT 
 1 AS `id`,
 1 AS `username`,
 1 AS `password`,
 1 AS `type`,
 1 AS `owner_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `admin_v_branches`
--

DROP TABLE IF EXISTS `admin_v_branches`;
/*!50001 DROP VIEW IF EXISTS `admin_v_branches`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `admin_v_branches` AS SELECT 
 1 AS `id`,
 1 AS `address`,
 1 AS `manager_id`,
 1 AS `name`,
 1 AS `manager_name`,
 1 AS `manager_surname`,
 1 AS `manager_email`,
 1 AS `manager_phone`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `admin_v_customers`
--

DROP TABLE IF EXISTS `admin_v_customers`;
/*!50001 DROP VIEW IF EXISTS `admin_v_customers`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `admin_v_customers` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `surname`,
 1 AS `last_seen_at`,
 1 AS `date_of_birth`,
 1 AS `address`,
 1 AS `email`,
 1 AS `phone_number`,
 1 AS `account_id`,
 1 AS `is_deleted`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `admin_v_employees`
--

DROP TABLE IF EXISTS `admin_v_employees`;
/*!50001 DROP VIEW IF EXISTS `admin_v_employees`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `admin_v_employees` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `surname`,
 1 AS `position`,
 1 AS `address`,
 1 AS `phone_number`,
 1 AS `email`,
 1 AS `branch_id`,
 1 AS `date_of_birth`,
 1 AS `account_id`,
 1 AS `is_deleted`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branches` (
  `id` varchar(36) NOT NULL,
  `address` varchar(255) NOT NULL,
  `manager_id` varchar(36) DEFAULT NULL,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_branch_id` (`id`),
  KEY `idx_branch_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES ('eedaac95-dac1-489d-a2a0-d6526431a62e','not found',NULL,'');
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `customer_v_branches`
--

DROP TABLE IF EXISTS `customer_v_branches`;
/*!50001 DROP VIEW IF EXISTS `customer_v_branches`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `customer_v_branches` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `address`,
 1 AS `manager_name`,
 1 AS `manager_surname`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `customer_v_employees`
--

DROP TABLE IF EXISTS `customer_v_employees`;
/*!50001 DROP VIEW IF EXISTS `customer_v_employees`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `customer_v_employees` AS SELECT 
 1 AS `name`,
 1 AS `surname`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `last_seen_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_of_birth` datetime NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `account_id` varchar(36) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ix_customer_name` (`name`),
  KEY `ix_customer_surname` (`surname`),
  KEY `ix_customer_email` (`email`),
  KEY `ix_customer_phone` (`phone_number`),
  KEY `ix_customer_id` (`id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('2f88a10e-e102-4e68-8ec3-2c11820614fe','Andrew','Navasaitis','2019-11-09 17:39:11','1990-10-10 00:00:00','3111111111111114 Unicorn Court, West Victoria Dock Rd., DD1 3BH','bar@bar.com','07597785318','',1);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_positions`
--

DROP TABLE IF EXISTS `employee_positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_positions` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `idx_employee_positions_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_positions`
--

LOCK TABLES `employee_positions` WRITE;
/*!40000 ALTER TABLE `employee_positions` DISABLE KEYS */;
INSERT INTO `employee_positions` VALUES ('088f91ee-7a82-4b3c-80e4-3da45dffc7d2','manager'),('b0c4a702-05a0-4fbd-9322-ccb0548a371b','support');
/*!40000 ALTER TABLE `employee_positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `employee_v_branches`
--

DROP TABLE IF EXISTS `employee_v_branches`;
/*!50001 DROP VIEW IF EXISTS `employee_v_branches`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `employee_v_branches` AS SELECT 
 1 AS `id`,
 1 AS `address`,
 1 AS `manager_id`,
 1 AS `name`,
 1 AS `manager_name`,
 1 AS `manager_surname`,
 1 AS `manager_email`,
 1 AS `manager_phone`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `employee_v_customers`
--

DROP TABLE IF EXISTS `employee_v_customers`;
/*!50001 DROP VIEW IF EXISTS `employee_v_customers`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `employee_v_customers` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `surname`,
 1 AS `last_seen_at`,
 1 AS `date_of_birth`,
 1 AS `address`,
 1 AS `email`,
 1 AS `phone_number`,
 1 AS `account_id`,
 1 AS `is_deleted`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `employee_v_employees`
--

DROP TABLE IF EXISTS `employee_v_employees`;
/*!50001 DROP VIEW IF EXISTS `employee_v_employees`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `employee_v_employees` AS SELECT 
 1 AS `name`,
 1 AS `surname`,
 1 AS `position`,
 1 AS `phone_number`,
 1 AS `email`,
 1 AS `branch_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `employee_v_vehicle_makes`
--

DROP TABLE IF EXISTS `employee_v_vehicle_makes`;
/*!50001 DROP VIEW IF EXISTS `employee_v_vehicle_makes`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `employee_v_vehicle_makes` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `image_path`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `employee_v_vehicle_pictures`
--

DROP TABLE IF EXISTS `employee_v_vehicle_pictures`;
/*!50001 DROP VIEW IF EXISTS `employee_v_vehicle_pictures`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `employee_v_vehicle_pictures` AS SELECT 
 1 AS `vehicle_id`,
 1 AS `file_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `employee_v_vehicle_purchases`
--

DROP TABLE IF EXISTS `employee_v_vehicle_purchases`;
/*!50001 DROP VIEW IF EXISTS `employee_v_vehicle_purchases`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `employee_v_vehicle_purchases` AS SELECT 
 1 AS `id`,
 1 AS `purchased_from_customer_id`,
 1 AS `bought_for`,
 1 AS `vehicle_id`,
 1 AS `purchased_by_employee_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `employee_v_vehicles`
--

DROP TABLE IF EXISTS `employee_v_vehicles`;
/*!50001 DROP VIEW IF EXISTS `employee_v_vehicles`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `employee_v_vehicles` AS SELECT 
 1 AS `id`,
 1 AS `make`,
 1 AS `model`,
 1 AS `year`,
 1 AS `price`,
 1 AS `milage`,
 1 AS `body_type`,
 1 AS `fuel_type`,
 1 AS `doors`,
 1 AS `seats`,
 1 AS `fuel_consumption`,
 1 AS `colour`,
 1 AS `engine`,
 1 AS `description`,
 1 AS `specification`,
 1 AS `gearbox`,
 1 AS `drivetrain`,
 1 AS `listed`,
 1 AS `created_at`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `branch_id` varchar(36) DEFAULT '00000000-0000-0000-0000-000000000000',
  `date_of_birth` datetime NOT NULL,
  `account_id` varchar(36) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ix_employee_position` (`position`),
  KEY `ix_employee_branch_id` (`branch_id`),
  KEY `ix_employee_name` (`name`),
  KEY `ix_employee_surname` (`surname`),
  KEY `ix_employee_phone` (`phone_number`),
  KEY `ix_employee_email` (`email`),
  KEY `ix_employee_branch` (`branch_id`),
  KEY `ix_employee_id` (`id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `employees_ibfk_3` FOREIGN KEY (`position`) REFERENCES `employee_positions` (`name`),
  CONSTRAINT `employees_ibfk_5` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('a401f0b3-a6b1-4caf-802b-96c0255701e6','Andrew','Navasaitis','manager','34 Unicorn Court, West Victoria Dock Rd., DD1 3BH','07597785318','foo@bar.com','eedaac95-dac1-489d-a2a0-d6526431a62e','1990-10-10 00:00:00','',1);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `guest_v_branches`
--

DROP TABLE IF EXISTS `guest_v_branches`;
/*!50001 DROP VIEW IF EXISTS `guest_v_branches`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `guest_v_branches` AS SELECT 
 1 AS `id`,
 1 AS `address`,
 1 AS `manager_id`,
 1 AS `name`,
 1 AS `manager_name`,
 1 AS `manager_surname`,
 1 AS `manager_email`,
 1 AS `manager_phone`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `guest_v_employees`
--

DROP TABLE IF EXISTS `guest_v_employees`;
/*!50001 DROP VIEW IF EXISTS `guest_v_employees`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `guest_v_employees` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `surname`,
 1 AS `position`,
 1 AS `address`,
 1 AS `phone_number`,
 1 AS `email`,
 1 AS `branch_id`,
 1 AS `date_of_birth`,
 1 AS `account_id`,
 1 AS `is_deleted`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `part_orders`
--

DROP TABLE IF EXISTS `part_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `part_orders` (
  `id` binary(16) NOT NULL,
  `quantity` smallint(6) NOT NULL DEFAULT '1',
  `part_id` binary(16) NOT NULL,
  `supplier_id` binary(16) NOT NULL,
  `price` decimal(13,2) NOT NULL,
  `delivered` tinyint(1) DEFAULT '0',
  `estm_delivery_time` datetime NOT NULL,
  `delivered_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_part_order_part_id` (`part_id`),
  KEY `ix_part_order_supplier_id` (`supplier_id`),
  KEY `ix_part_order_price` (`price`),
  KEY `ix_part_order_delivered` (`delivered`),
  CONSTRAINT `part_orders_ibfk_1` FOREIGN KEY (`part_id`) REFERENCES `parts` (`id`),
  CONSTRAINT `part_orders_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `part_orders`
--

LOCK TABLES `part_orders` WRITE;
/*!40000 ALTER TABLE `part_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `part_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `part_types`
--

DROP TABLE IF EXISTS `part_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `part_types` (
  `id` binary(16) NOT NULL,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `part_types`
--

LOCK TABLES `part_types` WRITE;
/*!40000 ALTER TABLE `part_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `part_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parts`
--

DROP TABLE IF EXISTS `parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parts` (
  `id` binary(16) NOT NULL,
  `car_make` varchar(256) NOT NULL,
  `car_model` varchar(256) NOT NULL,
  `catalogue_number` int(11) NOT NULL,
  `price` decimal(13,0) NOT NULL,
  `type` varchar(256) NOT NULL,
  `specification` json DEFAULT NULL,
  `name` varchar(256) NOT NULL,
  `quantity` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ix_part_car_make` (`car_make`),
  KEY `ix_part_car_model` (`car_model`),
  KEY `ix_part_catalogue_number` (`catalogue_number`),
  KEY `ix_part_price` (`price`),
  KEY `ix_part_type` (`type`),
  KEY `ix_part_name` (`name`),
  KEY `ix_part_id` (`id`),
  CONSTRAINT `parts_ibfk_1` FOREIGN KEY (`type`) REFERENCES `part_types` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parts`
--

LOCK TABLES `parts` WRITE;
/*!40000 ALTER TABLE `parts` DISABLE KEYS */;
/*!40000 ALTER TABLE `parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_parts`
--

DROP TABLE IF EXISTS `service_parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_parts` (
  `service_id` binary(16) NOT NULL,
  `part_id` binary(16) NOT NULL,
  KEY `ix_service_part_service_id` (`service_id`),
  KEY `ix_service_part_part_id` (`part_id`),
  CONSTRAINT `service_parts_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  CONSTRAINT `service_parts_ibfk_2` FOREIGN KEY (`part_id`) REFERENCES `parts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_parts`
--

LOCK TABLES `service_parts` WRITE;
/*!40000 ALTER TABLE `service_parts` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_types`
--

DROP TABLE IF EXISTS `service_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_types` (
  `id` binary(16) NOT NULL,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_types`
--

LOCK TABLES `service_types` WRITE;
/*!40000 ALTER TABLE `service_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` binary(16) NOT NULL,
  `type` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `customer_id` varchar(36) DEFAULT NULL,
  `branch_id` binary(16) NOT NULL,
  `cost` decimal(13,2) NOT NULL,
  `employee_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_service_type` (`type`),
  KEY `ix_service_customer_id` (`customer_id`),
  KEY `ix_service_branch_id` (`branch_id`),
  KEY `ix_service_employee_id` (`employee_id`),
  KEY `ix_service_id` (`id`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`type`) REFERENCES `service_types` (`name`),
  CONSTRAINT `services_ibfk_5` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suppliers` (
  `id` binary(16) NOT NULL,
  `name` varchar(256) NOT NULL,
  `address` varchar(256) NOT NULL,
  `contact` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_supplier_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_makes`
--

DROP TABLE IF EXISTS `vehicle_makes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicle_makes` (
  `id` varchar(36) NOT NULL,
  `name` varchar(256) NOT NULL,
  `image_path` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_vehicle_makes_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_makes`
--

LOCK TABLES `vehicle_makes` WRITE;
/*!40000 ALTER TABLE `vehicle_makes` DISABLE KEYS */;
INSERT INTO `vehicle_makes` VALUES ('93ffd383-2613-4b09-9024-5f513a966ddf','ford','./vehicle_make_pictures/ford/base.png'),('f1cfcacb-4f23-4f8e-9e46-4a8dbc7a9297','mazda','./vehicle_make_pictures/mazda/base.png');
/*!40000 ALTER TABLE `vehicle_makes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_pictures`
--

DROP TABLE IF EXISTS `vehicle_pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicle_pictures` (
  `vehicle_id` varchar(36) DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  UNIQUE KEY `file_name` (`file_name`),
  KEY `vehicle_id` (`vehicle_id`),
  CONSTRAINT `vehicle_pictures_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_pictures`
--

LOCK TABLES `vehicle_pictures` WRITE;
/*!40000 ALTER TABLE `vehicle_pictures` DISABLE KEYS */;
INSERT INTO `vehicle_pictures` VALUES ('5c52864b-2003-4208-a28e-5973f5433842','static/vehicle_pictures/5c52864b-2003-4208-a28e-5973f5433842/0.jpg'),('eedaac95-dac1-489d-a2a0-d6526431a62e','static/vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/0.jpg'),('eedaac95-dac1-489d-a2a0-d6526431a62e','static/vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/1.jpg'),('eedaac95-dac1-489d-a2a0-d6526431a62e','static/vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/2.jpg'),('eedaac95-dac1-489d-a2a0-d6526431a62e','static/vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/3.jpg'),('eedaac95-dac1-489d-a2a0-d6526431a62e','static/vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/4.jpg'),('eedaac95-dac1-489d-a2a0-d6526431a62e','static/vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/5.jpg'),('eedaac95-dac1-489d-a2a0-d6526431a62e','static/vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/6.jpg'),('eedaac95-dac1-489d-a2a0-d6526431a62e','static/vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/7.jpg'),('eedaac95-dac1-489d-a2a0-d6526431a62e','static/vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/8.jpg');
/*!40000 ALTER TABLE `vehicle_pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_purchases`
--

DROP TABLE IF EXISTS `vehicle_purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicle_purchases` (
  `id` varchar(36) NOT NULL,
  `purchased_from_customer_id` varchar(36) NOT NULL,
  `bought_for` decimal(13,2) NOT NULL,
  `purchased_by_employee_id` varchar(36) NOT NULL,
  `vehicle_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_car_purchase_customer_id` (`purchased_from_customer_id`),
  KEY `idx_purchased_by_employee_id` (`purchased_by_employee_id`),
  CONSTRAINT `vehicle_purchases_ibfk_4` FOREIGN KEY (`purchased_from_customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `vehicle_purchases_ibfk_5` FOREIGN KEY (`purchased_from_customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `vehicle_purchases_ibfk_6` FOREIGN KEY (`purchased_by_employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_purchases`
--

LOCK TABLES `vehicle_purchases` WRITE;
/*!40000 ALTER TABLE `vehicle_purchases` DISABLE KEYS */;
INSERT INTO `vehicle_purchases` VALUES ('196ef88b-fafc-4aa6-ab77-99109ac4f564','2f88a10e-e102-4e68-8ec3-2c11820614fe',500.00,'a401f0b3-a6b1-4caf-802b-96c0255701e6',''),('8162093a-93c9-43a0-a9b1-f3216b7c6ecd','2f88a10e-e102-4e68-8ec3-2c11820614fe',500.00,'a401f0b3-a6b1-4caf-802b-96c0255701e6','5c52864b-2003-4208-a28e-5973f5433842');
/*!40000 ALTER TABLE `vehicle_purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_sales`
--

DROP TABLE IF EXISTS `vehicle_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicle_sales` (
  `id` varchar(36) NOT NULL,
  `customer_id` varchar(36) DEFAULT NULL,
  `sold_for` decimal(13,2) NOT NULL,
  `sold_by_employee_id` binary(16) NOT NULL,
  `vehicle_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_car_sale_customer_id` (`customer_id`),
  KEY `ix_car_sale_sold_by_employee_id` (`sold_by_employee_id`),
  KEY `ix_car_sale_vehicle_id` (`vehicle_id`),
  CONSTRAINT `vehicle_sales_ibfk_4` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_sales`
--

LOCK TABLES `vehicle_sales` WRITE;
/*!40000 ALTER TABLE `vehicle_sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicle_sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicles` (
  `id` varchar(36) NOT NULL,
  `make` varchar(256) NOT NULL,
  `model` varchar(256) NOT NULL,
  `year` smallint(6) NOT NULL,
  `price` decimal(13,2) NOT NULL,
  `milage` int(11) NOT NULL,
  `body_type` varchar(256) NOT NULL,
  `fuel_type` varchar(256) NOT NULL,
  `doors` tinyint(4) NOT NULL,
  `seats` smallint(6) NOT NULL,
  `fuel_consumption` decimal(5,1) DEFAULT NULL,
  `colour` varchar(256) NOT NULL,
  `engine` decimal(3,1) NOT NULL,
  `description` text NOT NULL,
  `specification` json DEFAULT NULL,
  `gearbox` text NOT NULL,
  `drivetrain` text NOT NULL,
  `listed` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ix_vehicle_make` (`make`),
  KEY `ix_vehicle_model` (`model`),
  KEY `ix_vehicle_year` (`year`),
  KEY `ix_vehicle_price` (`price`),
  KEY `ix_vehicle_milage` (`milage`),
  KEY `ix_vehicle_body_type` (`body_type`),
  KEY `ix_vehicle_fuel_type` (`fuel_type`),
  KEY `ix_vehicle_doors` (`doors`),
  KEY `ix_vehicle_seats` (`seats`),
  KEY `ix_vehicle_fuel_consumption` (`fuel_consumption`),
  KEY `ix_vehicle_fuel_colour` (`colour`),
  KEY `ix_vehicle_engine` (`engine`),
  KEY `ix_vehicle_id` (`id`),
  CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`make`) REFERENCES `vehicle_makes` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES ('5c52864b-2003-4208-a28e-5973f5433842','mazda','6',2007,595.00,114890,'hatchback','petrol',5,5,44.8,'blue',2.0,'Mazda 6 2.0TS (147 hp) Low genuine mileage. Engine, gearbox, clutch excellent condition. Good bodywork. 2 keys., Smoke free, Pet free, HPI clear, Recent MOT Next MOT due 16/12/2019, Part service history, Blue, 4 owners, £595','{}','manual','fwd',0,'2019-11-07 11:34:07'),('eedaac95-dac1-489d-a2a0-d6526431a62e','ford','kuga',2019,22478.00,466,'suv','diesel',5,5,43.5,'black',2.0,'Here we have an opportunity to buy an ultra low mileage Kuga ST-Line 2WD at a bargain price! This model is a real stunner in Shadow Black with upgraded 19 inch Rock Metallic Alloy Wheels, along with black roof rails and privacy glass','{\"Safety\": [\"Courtesy Lights - Front and Rear\", \"Ford Key Free System - Keyless Entry with Keyless Start\", \"Child Locks - Manual on Rear Doors\", \"Seats - ISOFIX Mounting Provision for Child Seats - Outer Seats Only\", \"Airbags - Front Side Impact\", \"Airbags - Drivers Knee\", \"Electric Parking Brake\", \"Anti-Lock Braking System - ABS with Electronic Stability Control - ESC\", \"EBA - Emergency Brake Assist\", \"Airbags - Driver and Front Passenger\", \"Remote Central-Double Locking\", \"IPS - Intelligent Protection System\", \"Fog Lights - Front\", \"Airbags - Front and Rear Side Curtain\", \"Engine Immobiliser\", \"Thatcham Category 1 Alarm\", \"Headlights - Halogen with LED Daytime Running Lights\"], \"Dimensions\": {\"Width\": \"2086 mm\", \"Height\": \"1737 mm\", \"Length\": \"4541 mm\", \"Wheelbase\": \"2690 mm\", \"Fuel tank capacity\": \"60 litres\", \"Minimum kerb weight\": \"1647 kg\", \"Gross vehicle weight\": \"2250 kg\", \"Boot space (seats up)\": \"406 litres\", \"Boot space (seats down)\": \"1603 litres\"}, \"Driver Convenience\": [\"Ford SYNC3 DAB Navigation System\", \"12V Power Socket - Load Compartment\", \"Cruise Control with Adjustable Speed Limiter\", \"Rear Parking Sensors\", \"Enhanced Active Park Assist\", \"Tyre Pressure Monitoring System\"], \"Economy & Performance\": {\"Valves\": \"16\", \"Cylinders\": \"4\", \"Top speed\": \"121 mph\", \"0 - 62 mph\": \"10.1 seconds\", \"Annual tax\": \"£145\", \"Engine power\": \"148 bhp\", \"Engine torque\": \"273 lbs/ft\", \"CO₂ emissions\": \"152g/km\", \"Fuel consumption (combined)\": \"43.5 mpg\"}}','manual','2wd',0,'2019-11-07 11:34:07');
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `admin_v_accounts`
--

/*!50001 DROP VIEW IF EXISTS `admin_v_accounts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `admin_v_accounts` AS select `accounts`.`id` AS `id`,`accounts`.`username` AS `username`,`accounts`.`password` AS `password`,`accounts`.`type` AS `type`,`accounts`.`owner_id` AS `owner_id` from `accounts` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `admin_v_branches`
--

/*!50001 DROP VIEW IF EXISTS `admin_v_branches`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `admin_v_branches` AS select `b`.`id` AS `id`,`b`.`address` AS `address`,`b`.`manager_id` AS `manager_id`,`b`.`name` AS `name`,`m`.`name` AS `manager_name`,`m`.`surname` AS `manager_surname`,`m`.`email` AS `manager_email`,`m`.`phone_number` AS `manager_phone` from (`branches` `b` join `employees` `m` on((`m`.`id` = `b`.`manager_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `admin_v_customers`
--

/*!50001 DROP VIEW IF EXISTS `admin_v_customers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `admin_v_customers` AS select `customers`.`id` AS `id`,`customers`.`name` AS `name`,`customers`.`surname` AS `surname`,`customers`.`last_seen_at` AS `last_seen_at`,`customers`.`date_of_birth` AS `date_of_birth`,`customers`.`address` AS `address`,`customers`.`email` AS `email`,`customers`.`phone_number` AS `phone_number`,`customers`.`account_id` AS `account_id`,`customers`.`is_deleted` AS `is_deleted` from `customers` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `admin_v_employees`
--

/*!50001 DROP VIEW IF EXISTS `admin_v_employees`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `admin_v_employees` AS select `employees`.`id` AS `id`,`employees`.`name` AS `name`,`employees`.`surname` AS `surname`,`employees`.`position` AS `position`,`employees`.`address` AS `address`,`employees`.`phone_number` AS `phone_number`,`employees`.`email` AS `email`,`employees`.`branch_id` AS `branch_id`,`employees`.`date_of_birth` AS `date_of_birth`,`employees`.`account_id` AS `account_id`,`employees`.`is_deleted` AS `is_deleted` from `employees` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `customer_v_branches`
--

/*!50001 DROP VIEW IF EXISTS `customer_v_branches`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `customer_v_branches` AS select `b`.`id` AS `id`,`b`.`name` AS `name`,`b`.`address` AS `address`,`e`.`name` AS `manager_name`,`e`.`surname` AS `manager_surname` from (`branches` `b` join `employees` `e` on((`e`.`id` = `b`.`manager_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `customer_v_employees`
--

/*!50001 DROP VIEW IF EXISTS `customer_v_employees`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `customer_v_employees` AS select `employees`.`name` AS `name`,`employees`.`surname` AS `surname` from `employees` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `employee_v_branches`
--

/*!50001 DROP VIEW IF EXISTS `employee_v_branches`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `employee_v_branches` AS select `b`.`id` AS `id`,`b`.`address` AS `address`,`b`.`manager_id` AS `manager_id`,`b`.`name` AS `name`,`m`.`name` AS `manager_name`,`m`.`surname` AS `manager_surname`,`m`.`email` AS `manager_email`,`m`.`phone_number` AS `manager_phone` from (`branches` `b` join `employees` `m` on((`m`.`id` = `b`.`manager_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `employee_v_customers`
--

/*!50001 DROP VIEW IF EXISTS `employee_v_customers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `employee_v_customers` AS select `customers`.`id` AS `id`,`customers`.`name` AS `name`,`customers`.`surname` AS `surname`,`customers`.`last_seen_at` AS `last_seen_at`,`customers`.`date_of_birth` AS `date_of_birth`,`customers`.`address` AS `address`,`customers`.`email` AS `email`,`customers`.`phone_number` AS `phone_number`,`customers`.`account_id` AS `account_id`,`customers`.`is_deleted` AS `is_deleted` from `customers` where (`customers`.`is_deleted` = FALSE) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `employee_v_employees`
--

/*!50001 DROP VIEW IF EXISTS `employee_v_employees`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `employee_v_employees` AS select `employees`.`name` AS `name`,`employees`.`surname` AS `surname`,`employees`.`position` AS `position`,`employees`.`phone_number` AS `phone_number`,`employees`.`email` AS `email`,`employees`.`branch_id` AS `branch_id` from `employees` where (`employees`.`is_deleted` = FALSE) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `employee_v_vehicle_makes`
--

/*!50001 DROP VIEW IF EXISTS `employee_v_vehicle_makes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `employee_v_vehicle_makes` AS select `vehicle_makes`.`id` AS `id`,`vehicle_makes`.`name` AS `name`,`vehicle_makes`.`image_path` AS `image_path` from `vehicle_makes` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `employee_v_vehicle_pictures`
--

/*!50001 DROP VIEW IF EXISTS `employee_v_vehicle_pictures`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `employee_v_vehicle_pictures` AS select `vehicle_pictures`.`vehicle_id` AS `vehicle_id`,`vehicle_pictures`.`file_name` AS `file_name` from `vehicle_pictures` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `employee_v_vehicle_purchases`
--

/*!50001 DROP VIEW IF EXISTS `employee_v_vehicle_purchases`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `employee_v_vehicle_purchases` AS select `vehicle_purchases`.`id` AS `id`,`vehicle_purchases`.`purchased_from_customer_id` AS `purchased_from_customer_id`,`vehicle_purchases`.`bought_for` AS `bought_for`,`vehicle_purchases`.`vehicle_id` AS `vehicle_id`,`vehicle_purchases`.`purchased_by_employee_id` AS `purchased_by_employee_id` from `vehicle_purchases` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `employee_v_vehicles`
--

/*!50001 DROP VIEW IF EXISTS `employee_v_vehicles`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `employee_v_vehicles` AS select `vehicles`.`id` AS `id`,`vehicles`.`make` AS `make`,`vehicles`.`model` AS `model`,`vehicles`.`year` AS `year`,`vehicles`.`price` AS `price`,`vehicles`.`milage` AS `milage`,`vehicles`.`body_type` AS `body_type`,`vehicles`.`fuel_type` AS `fuel_type`,`vehicles`.`doors` AS `doors`,`vehicles`.`seats` AS `seats`,`vehicles`.`fuel_consumption` AS `fuel_consumption`,`vehicles`.`colour` AS `colour`,`vehicles`.`engine` AS `engine`,`vehicles`.`description` AS `description`,`vehicles`.`specification` AS `specification`,`vehicles`.`gearbox` AS `gearbox`,`vehicles`.`drivetrain` AS `drivetrain`,`vehicles`.`listed` AS `listed`,`vehicles`.`created_at` AS `created_at` from `vehicles` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `guest_v_branches`
--

/*!50001 DROP VIEW IF EXISTS `guest_v_branches`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `guest_v_branches` AS select `b`.`id` AS `id`,`b`.`address` AS `address`,`b`.`manager_id` AS `manager_id`,`b`.`name` AS `name`,`m`.`name` AS `manager_name`,`m`.`surname` AS `manager_surname`,`m`.`email` AS `manager_email`,`m`.`phone_number` AS `manager_phone` from (`branches` `b` join `employees` `m` on((`m`.`id` = `b`.`manager_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `guest_v_employees`
--

/*!50001 DROP VIEW IF EXISTS `guest_v_employees`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `guest_v_employees` AS select `employees`.`id` AS `id`,`employees`.`name` AS `name`,`employees`.`surname` AS `surname`,`employees`.`position` AS `position`,`employees`.`address` AS `address`,`employees`.`phone_number` AS `phone_number`,`employees`.`email` AS `email`,`employees`.`branch_id` AS `branch_id`,`employees`.`date_of_birth` AS `date_of_birth`,`employees`.`account_id` AS `account_id`,`employees`.`is_deleted` AS `is_deleted` from `employees` where (`employees`.`id` = '0') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-10 13:19:32
