-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
SHOW WARNINGS;
-- -----------------------------------------------------
-- Schema NFLMODEL
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `NFLMODEL` ;

-- -----------------------------------------------------
-- Schema NFLMODEL
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `NFLMODEL` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `NFLMODEL` ;

-- -----------------------------------------------------
-- Table `USER_STATUS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `USER_STATUS` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `USER_STATUS` (
  `UID` VARCHAR(36) NOT NULL,
  `CODE` VARCHAR(36) NOT NULL,
  `LABEL` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`UID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `USER_TYPE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `USER_TYPE` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `USER_TYPE` (
  `UID` VARCHAR(36) NOT NULL,
  `CODE` VARCHAR(36) NOT NULL,
  `LABEL` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`UID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `USER` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `USER` (
  `UID` VARCHAR(36) NOT NULL,
  `USER_UID` VARCHAR(36) NULL DEFAULT NULL,
  `NAME` VARCHAR(36) NULL DEFAULT NULL,
  `PWD` VARCHAR(45) NULL DEFAULT NULL,
  `STATUS` VARCHAR(36) NULL DEFAULT NULL,
  `TYPE` VARCHAR(36) NULL DEFAULT NULL,
  PRIMARY KEY (`UID`),
  INDEX `FK_USER_STATUS_1_idx` (`STATUS` ASC) VISIBLE,
  INDEX `FK_USER_TYPE_1_idx` (`TYPE` ASC) VISIBLE,
  CONSTRAINT `FK_USER_STATUS_1`
    FOREIGN KEY (`STATUS`)
    REFERENCES `NFLMODEL`.`USER_STATUS` (`UID`),
  CONSTRAINT `FK_USER_TYPE_1`
    FOREIGN KEY (`TYPE`)
    REFERENCES `NFLMODEL`.`USER_TYPE` (`UID`))  
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `CONNEXION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CONNEXION` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `CONNEXION` (
  `UID` VARCHAR(36) NOT NULL,
  `USER_UID` VARCHAR(36) NULL DEFAULT NULL,
  `SESSION_ID` VARCHAR(36) NULL DEFAULT NULL,
  `START_DT_TIME` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UID`),
  INDEX `FK_USER_1_idx` (`USER_UID` ASC) VISIBLE,
  CONSTRAINT `FK_USER_1`
    FOREIGN KEY (`USER_UID`)
    REFERENCES `NFLMODEL`.`USER` (`UID`))    
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `GAME`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GAME` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `GAME` (
  `UID` VARCHAR(36) NOT NULL,
  `USER_A_UID` VARCHAR(36) NULL DEFAULT NULL,
  `USER_B_UID` VARCHAR(36) NULL DEFAULT NULL,
  `SCORE_A` INT(11) NULL DEFAULT '0',
  `SCORE_B` INT(11) NULL DEFAULT '0',
  `DT_TIME` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `WEEK` INT(2) NULL DEFAULT '1',
  `TEAM_NAME` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`UID`),
  INDEX `FK_USER_A_idx` (`USER_A_UID` ASC) VISIBLE,
  INDEX `FK_USER_B_idx` (`USER_B_UID` ASC) VISIBLE,
  CONSTRAINT `FK_USER_A`
    FOREIGN KEY (`USER_A_UID`)
    REFERENCES `NFLMODEL`.`USER` (`UID`),
  CONSTRAINT `FK_USER_B`
    FOREIGN KEY (`USER_B_UID`)
    REFERENCES `NFLMODEL`.`USER` (`UID`))  
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `PLAYER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PLAYER` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `PLAYER` (
  `UID` VARCHAR(36) NOT NULL,
  `PLAYER_ID` VARCHAR(45) NULL DEFAULT NULL,
  `NAME` VARCHAR(36) NULL DEFAULT NULL,
  `EMAIL` VARCHAR(36) NULL DEFAULT NULL,
  `SCORE` DECIMAL(10,0) NULL DEFAULT '0',
  `IMG_URL` VARCHAR(450) NULL DEFAULT NULL,
  PRIMARY KEY (`UID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `POSITION_PRM`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `POSITION_PRM` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `POSITION_PRM` (
  `UID` VARCHAR(36) NOT NULL,
  `CODE` VARCHAR(36) NULL DEFAULT NULL,
  `LABEL` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`UID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `GAME_SELECTION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GAME_SELECTION` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `GAME_SELECTION` (
  `UID` VARCHAR(36) NOT NULL,
  `GAME_UID` VARCHAR(36) NULL DEFAULT NULL,
  `PLAYER_UID` VARCHAR(36) NULL DEFAULT NULL,
  `POSITION_UID` VARCHAR(36) NULL DEFAULT NULL,
  PRIMARY KEY (`UID`),
  INDEX `FK_GAME_UID_1_idx` (`GAME_UID` ASC) VISIBLE,
  INDEX `FK_PLAYER_UID_1_idx` (`PLAYER_UID` ASC) VISIBLE,
  INDEX `FK_POSITION_UID_1_idx` (`POSITION_UID` ASC) VISIBLE,
  CONSTRAINT `FK_GAME_UID_1`
    FOREIGN KEY (`GAME_UID`)
    REFERENCES `NFLMODEL`.`GAME` (`UID`),
  CONSTRAINT `FK_PLAYER_UID_1`
    FOREIGN KEY (`PLAYER_UID`)
    REFERENCES `NFLMODEL`.`PLAYER` (`UID`),
  CONSTRAINT `FK_POSITION_UID_1`
    FOREIGN KEY (`POSITION_UID`)
    REFERENCES `NFLMODEL`.`POSITION_PRM` (`UID`))  
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;
USE `NFLMODEL` ;

-- -----------------------------------------------------
-- procedure CreatePlayer
-- -----------------------------------------------------

USE `NFLMODEL`;
DROP procedure IF EXISTS `CreatePlayer`;
SHOW WARNINGS;

DELIMITER $$
USE `NFLMODEL`$$
CREATE  PROCEDURE `CreatePlayer`(in player_id varchar(36),in name varchar(36),in email varchar(36),in score varchar(4),in img_url varchar(500))
BEGIN
    DECLARE NEW_UID   VARCHAR(36);
    DECLARE ERR BOOLEAN default false;
    DECLARE RESULT varchar(1000) Default ' ';
	DECLARE ERROR_MSG   varchar(500) Default ' ';    
  
	IF(player_id IS NULL or  player_id = '') THEN
        SET ERROR_MSG :=   CONCAT(ERROR_MSG, '\r\n', '{\'error\':\'The Player ID  is required\'}');
        SET ERR = true;
        #call debug_msg(@enabled, ERROR_MSG);
    END IF;
    
	IF ( EXISTS( select * from `PLAYER` where UPPER (`PLAYER`.`PLAYER_ID`) = UPPER ( player_id ) ) ) THEN
      SET ERROR_MSG :=   CONCAT(ERROR_MSG, '\r\n', '{\'error\':\'The player  ID : ', player_id , ' is already taken\'}');
        SET ERR = true;     
        #call debug_msg(@enabled, '3');
    END IF;
     SET RESULT = '{}' ;
  
    IF (ERR) THEN
       #call debug_msg(@enabled, '4');
       SET RESULT := ERROR_MSG  ;
     ELSE    
		#call debug_msg(@enabled, '5');
        
		SET NEW_UID = uuid();
   
		START TRANSACTION;       
			INSERT INTO `PLAYER` (`UID`, `PLAYER_ID`, `NAME`, `EMAIL`, `SCORE`, `IMG_URL`) 
			VALUES (NEW_UID, player_id, name ,email ,score , img_url); 
		COMMIT;
        
    	SELECT   JSON_ARRAYAGG(JSON_OBJECT( 
            "uid" , NEW_UID,
			"player_id", player_id ,  
			"name",name ,  
			"email",email ,  
			"score",score , 
			"img_url",img_url 
        ))  into RESULT   
		FROM  `PLAYER` 
		WHERE PLAYER.UID  = NEW_UID ; 
    END IF;
 
    SELECT RESULT  as `data`;   
    
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure CreateUser
-- -----------------------------------------------------

USE `NFLMODEL`;
DROP procedure IF EXISTS `CreateUser`;
SHOW WARNINGS;

DELIMITER $$
USE `NFLMODEL`$$
CREATE  PROCEDURE `CreateUser`(in user_id varchar(36), in name varchar(36), in password varchar(36), in is_active boolean)
BEGIN
	DECLARE UID_STATUS VARCHAR(36);
	DECLARE UID_TYPE   VARCHAR(36);
	DECLARE NEW_UID   VARCHAR(36);
	DECLARE ERROR_MSG   varchar(500) Default ' ';
	DECLARE RESULT varchar(500) Default ' ';
	DECLARE ERR Boolean default false;
        
    #SET enabled = TRUE;
 
	IF(user_id IS NULL or  user_id = '') THEN
        SET ERROR_MSG :=   CONCAT(ERROR_MSG, '\r\n', '{\'error\':\'The User ID  is required\'}');
        SET ERR = true;
        #call debug_msg(@enabled, ERROR_MSG);
    END IF;
    
    IF(name IS NULL  or  name = '') THEN
        SET ERROR_MSG :=   CONCAT(ERROR_MSG, '\r\n', '{\'error\':\'The User Name  is required\'}');
        SET ERR = true;   
        #call debug_msg(@enabled, '2');
    END IF;
    
    IF(password IS NULL  or  password = '') THEN
        SET ERROR_MSG :=   CONCAT(ERROR_MSG, '\r\n', '{\'error\':\'The User Password  is required\'}');
        SET ERR = true;     
        #call debug_msg(@enabled, '3');
    END IF;
    
    IF ( EXISTS( select * from `USER` where UPPER (`USER`.`USER_UID`) = UPPER ( user_id ) ) ) THEN
      SET ERROR_MSG :=   CONCAT(ERROR_MSG, '\r\n', '{\'error\':\'The User ID : ', user_id , ' is already taken\'}');
        SET ERR = true;     
        #call debug_msg(@enabled, '3');
    END IF;
         
    SET RESULT = '{}' ;
  
    IF (ERR) THEN
       call debug_msg(@enabled, '4');
       SET RESULT := ERROR_MSG  ;
     ELSE    
		call debug_msg(@enabled, '5');
		SET NEW_UID = uuid();
		
		Select UID into UID_STATUS  FROM USER_STATUS WHERE  CODE =   IF(is_active,'ACTIVE','INACTIVE') ;
		Select UID into UID_TYPE FROM USER_TYPE WHERE CODE = 'HUMAN';   
		START TRANSACTION;
			INSERT INTO `USER`(`UID`,`USER_UID`,`NAME`,`PWD`,`STATUS`,`TYPE`)
			VALUES(NEW_UID,user_id,name,password,UID_STATUS,UID_TYPE );
		COMMIT;
    	SELECT   JSON_ARRAYAGG(JSON_OBJECT("uid", USER.UID,"user_uid", USER.user_uid, "name", USER.name , "pwd", USER.pwd , 
        "status", (select label from USER_STATUS where USER_STATUS.UID = UID_STATUS ) ,
        "type", (select label from USER_TYPE where USER_TYPE.UID = UID_TYPE ) 
        ))  into RESULT   
		FROM  `USER` 
		WHERE USER.UID  = NEW_UID ; 
    END IF;
 
    SELECT RESULT  as `data`;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure GetAllPositionInfos
-- -----------------------------------------------------

USE `NFLMODEL`;
DROP procedure IF EXISTS `GetAllPositionInfos`;
SHOW WARNINGS;

DELIMITER $$
USE `NFLMODEL`$$
CREATE  PROCEDURE `GetAllPositionInfos`()
BEGIN
   SELECT   JSON_ARRAYAGG(JSON_OBJECT("uid", uid,"code", code, "label", label ))    FROM  `POSITION_PRM`;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure debug_msg
-- -----------------------------------------------------

USE `NFLMODEL`;
DROP procedure IF EXISTS `debug_msg`;
SHOW WARNINGS;

DELIMITER $$
USE `NFLMODEL`$$
CREATE  PROCEDURE `debug_msg`(enabled INTEGER, msg VARCHAR(255))
BEGIN
  IF enabled THEN
    select concat('** ', msg) AS '** DEBUG:';
  END IF;
END$$

DELIMITER ;
SHOW WARNINGS;
USE `NFLMODEL`;

DELIMITER $$

USE `NFLMODEL`$$
DROP TRIGGER IF EXISTS `USER_STATUS_BEFORE_INSERT` $$
SHOW WARNINGS$$
USE `NFLMODEL`$$
CREATE

TRIGGER `NFLMODEL`.`USER_STATUS_BEFORE_INSERT`
BEFORE INSERT ON `NFLMODEL`.`USER_STATUS`
FOR EACH ROW
BEGIN
    IF NEW.UID IS NULL THEN
       SET NEW.UID  = uuid();
    END IF;
END$$

SHOW WARNINGS$$

USE `NFLMODEL`$$
DROP TRIGGER IF EXISTS `USER_TYPE_BEFORE_INSERT` $$
SHOW WARNINGS$$
USE `NFLMODEL`$$
CREATE

TRIGGER `NFLMODEL`.`USER_TYPE_BEFORE_INSERT`
BEFORE INSERT ON `NFLMODEL`.`USER_TYPE`
FOR EACH ROW
BEGIN
    IF NEW.UID IS NULL THEN
       SET NEW.UID  = uuid();
    END IF;
END$$

SHOW WARNINGS$$

USE `NFLMODEL`$$
DROP TRIGGER IF EXISTS `USER_BEFORE_INSERT` $$
SHOW WARNINGS$$
USE `NFLMODEL`$$
CREATE

TRIGGER `NFLMODEL`.`USER_BEFORE_INSERT`
BEFORE INSERT ON `NFLMODEL`.`USER`
FOR EACH ROW
BEGIN
    IF NEW.UID IS NULL THEN
       SET NEW.UID  = uuid();
    END IF;
END$$

SHOW WARNINGS$$

USE `NFLMODEL`$$
DROP TRIGGER IF EXISTS `CONNEXION_BEFORE_INSERT` $$
SHOW WARNINGS$$
USE `NFLMODEL`$$
CREATE

TRIGGER `NFLMODEL`.`CONNEXION_BEFORE_INSERT`
BEFORE INSERT ON `NFLMODEL`.`CONNEXION`
FOR EACH ROW
BEGIN
    IF NEW.UID IS NULL THEN
       SET NEW.UID  = uuid();
    END IF;
END$$

SHOW WARNINGS$$

USE `NFLMODEL`$$
DROP TRIGGER IF EXISTS `GAME_BEFORE_INSERT` $$
SHOW WARNINGS$$
USE `NFLMODEL`$$
CREATE

TRIGGER `NFLMODEL`.`GAME_BEFORE_INSERT`
BEFORE INSERT ON `NFLMODEL`.`GAME`
FOR EACH ROW
BEGIN
    IF NEW.UID IS NULL THEN
       SET NEW.UID  = uuid();
    END IF;
END$$

SHOW WARNINGS$$

USE `NFLMODEL`$$
DROP TRIGGER IF EXISTS `PLAYER_BEFORE_INSERT` $$
SHOW WARNINGS$$
USE `NFLMODEL`$$
CREATE

TRIGGER `NFLMODEL`.`PLAYER_BEFORE_INSERT`
BEFORE INSERT ON `NFLMODEL`.`PLAYER`
FOR EACH ROW
BEGIN
    IF NEW.UID IS NULL THEN
       SET NEW.UID  = uuid();
    END IF;
END$$

SHOW WARNINGS$$

USE `NFLMODEL`$$
DROP TRIGGER IF EXISTS `POSITION_PRM_BEFORE_INSERT` $$
SHOW WARNINGS$$
USE `NFLMODEL`$$
CREATE

TRIGGER `NFLMODEL`.`POSITION_PRM_BEFORE_INSERT`
BEFORE INSERT ON `NFLMODEL`.`POSITION_PRM`
FOR EACH ROW
BEGIN
    IF NEW.UID IS NULL THEN
       SET NEW.UID  = uuid();
    END IF;
END$$

SHOW WARNINGS$$

USE `NFLMODEL`$$
DROP TRIGGER IF EXISTS `GAME_SELECTION_BEFORE_INSERT` $$
SHOW WARNINGS$$
USE `NFLMODEL`$$
CREATE

TRIGGER `NFLMODEL`.`GAME_SELECTION_BEFORE_INSERT`
BEFORE INSERT ON `NFLMODEL`.`GAME_SELECTION`
FOR EACH ROW
BEGIN
    IF NEW.UID IS NULL THEN
       SET NEW.UID  = uuid();
    END IF;
END$$

SHOW WARNINGS$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
