const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees_db",
    rowsAsArray: true,
  },
  console.log(`Connected to the database.`)
);

// const [rows, fields] = db.execute(
//   "SELECT manager_id,first_name, last_name FROM employee"
// );

function manListGen() {
  db.query(
    `select manager_id,first_name, last_name FROM employee;`,
    function (err, results) {
      console.table(results);
    }
  );
}

const options = [
  "View all employees",
  "Add Employee",
  "Update Employee Roles",
  "View All Roles",
  "Add Role",
  "View All Departments",
  "Add Department",
];

const startMenu = [
  {
    type: "list",
    name: "choice",
    choices: options,
  },
];

const empAdd = [
  {
    message: "What is the employee's first name?",
    name: "empFirstName",
  },
  {
    message: "What is the employee's last name?",
    name: "empLastName",
  },
  {
    type: "input",
    message: "What is the employee's role",
    name: "empRole",
  },
  {
    type: "input",
    message: "Who is the employee's manager",
    name: "empMan",
  },
];

const roleAdd = [
  {
    type: "input",
    message: "What is the name of the role?",
    name: "roleAddName",
  },
  {
    type: "input",
    message: "What is the salary of the role?",
    name: "roleAddSal",
  },
  {
    type: "input",
    message: "What department does the role belong to",
    name: "roleAddDept",
  },
];

function init() {
  inquirer.prompt(startMenu).then(function (data) {
    if (data.choice === "Add Department") {
      inquirer
        .prompt({
          type: "input",
          message: "what is the name of the department you want to add?",
          name: "deptName",
        })
        .then(function (info) {
          db.connect();
          db.query(
            `INSERT INTO department(name) VALUES("${info.deptName}");`,
            function (err) {
              if (err) console.log(err);
            }
          );
          return init();
        });
    } else if (data.choice === "Add Employee") {
      manListGen();
      inquirer.prompt(empAdd).then(function (info) {
        db.query(
          `INSERT INTO employee (first_name,last_name,role_id,manager_id) Values("${info.empFirstName}","${info.empLastName}","${info.empRole}","${info.empMan}");`,
          function (err, result) {
            if (err) console.log(err);
          }
        );
        return init();
      });
    } else if (data.choice === "Update Employee Roles") {
      db.query(
        "SELECT first_name,role_id FROM employee",
        function (err, result) {
          if (err) console.log(err);
          console.table(result);
          return init();
        }
      );
    } else if (data.choice === "View All Roles") {
      db.connect();
      db.query("SELECT * FROM role", function (err, result) {
        if (err) console.log(err);
        console.table(result);
        return init();
      });
    } else if (data.choice === "Add Role") {
      inquirer.prompt(roleAdd).then(function (info) {
        db.query(
          `INSERT INTO role (title,salary,department_id) Values("${info.roleAddName}","${info.roleAddSal}","${info.roleAddDept}");`,
          function (err, result) {
            if (err) console.log(err);
          }
        );
        return init();
      });
    } else if (data.choice === "View All Departments") {
      db.connect();
      db.query("SELECT * FROM department", function (err, result) {
        if (err) console.log(err);
        console.table(result);
        return init();
      });
    } else if (data.choice === "View all employees") {
      db.connect();
      db.query("SELECT * FROM employee", function (err, result) {
        if (err) console.log(err);
        console.table(result);
        return init();
      });
    }
  });
}

init();
