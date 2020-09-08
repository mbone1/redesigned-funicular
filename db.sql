DROP DATABASE IF EXISTS db;
CREATE DATABASE db;

USE db;


CREATE TABLE department(
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE role(
  id INT AUTO_INCREMENT NOT NULL,
  role_name VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_name VARCHAR(30),
  PRIMARY KEY (id)
);
CREATE TABLE employee(
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  empRole VARCHAR(30) NOT NULL,
  manager_name VARCHAR(30),
  PRIMARY KEY (id)
);







-- * **department**:

--   * **id** - INT PRIMARY KEY
--   * **name** - VARCHAR(30) to hold department name

-- * **role**:

--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role belongs to

-- * **employee**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager






