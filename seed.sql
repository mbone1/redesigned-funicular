INSERT INTO department (name) values ('Accounting');
INSERT INTO department (name) values ('Bear-Training');
INSERT INTO department (name) values ('Food-Services');
INSERT INTO department (name) values ('Coffee');

INSERT INTO role (role_name, salary) values ('Head-Trainer', 50000);
INSERT INTO role (role_name, salary) values ('Head-Chef', 60000);
INSERT INTO role (role_name, salary) values ('Bear-Bait', 7000);
INSERT INTO role (role_name, salary) values ('Barista', 10000);

INSERT INTO employee (first_name, last_name, empRole, manager_name) values ('Dingus', 'Jones', 'Head-Chef', 'Monet');
INSERT INTO employee (first_name, last_name, empRole, manager_name) values ('Gregor', 'Tingleberry', 'Bear-Bait', 'Monet');
INSERT INTO employee (first_name, last_name, empRole, manager_name) values ('Monet', 'Pondublefring', 'Manager', 'Monet');
INSERT INTO employee (first_name, last_name, empRole, manager_name) values ('Chuck', 'Gregnonugus', 'Bear-Bait', 'Monet');
INSERT INTO employee (first_name, last_name, empRole, manager_name) values ('Sally', 'Conflubles', 'Barista', 'Monet');