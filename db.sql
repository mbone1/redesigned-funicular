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
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL default 0,
  PRIMARY KEY (id)
);
CREATE TABLE employee(
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL default 0,
  manager_id INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO department (name) values ('Accounting');
INSERT INTO department (name) values ('Bear-Training');
INSERT INTO department (name) values ('Food-Services');
INSERT INTO department (name) values ('Coffee');

INSERT INTO role (title, salary) values ('Head-Trainer', 50000);
INSERT INTO role (title, salary) values ('Head-Chef', 60000);
INSERT INTO role (title, salary) values ('Bear-Bait', 7000);
INSERT INTO role (title, salary) values ('Barista', 10000);

INSERT INTO employee (first_name, last_name) values ('Dingus', 'Jones');
INSERT INTO employee (first_name, last_name) values ('Gregor', 'Tingleberry');
INSERT INTO employee (first_name, last_name) values ('Monet', 'Pondublefring');
INSERT INTO employee (first_name, last_name) values ('Chuck', 'Gregnonugus');
INSERT INTO employee (first_name, last_name) values ('Sally', 'Conflubles');





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






