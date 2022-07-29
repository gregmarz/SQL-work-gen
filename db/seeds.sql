USE employees_db;
INSERT INTO department (name)
VALUES ("Engineering"),("Finance"),("Legal"),("Sales"),("Service");

INSERT INTO role (title,salary,department_id)
VALUES ("Software Developer",100000,1),
("Finance Manager",500000,2),
("Lawyer",1000000,3),
("Customer Service",10000,4),
("Cool Guy",1000000000,5);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Greg","Marzec",1,1),
("Thomas","Butler",2,2),
("Emma","Lee",3,3),
("George","Michaels",4,4);