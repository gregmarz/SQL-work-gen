const inquirer = require("inquirer");
const mysql = require("mysql2");

// const db = mysql.createConnection(
//   {
//     host: "localhost",
//     // MySQL username,
//     user: "root",
//     // MySQL password
//     password: "root",
//     database: "employees_db",
//   },
//   console.log(`Connected to the database.`)
// );

const roleList = ["Customer Service", "Manager", "Engineer", "Intern", "Dude"];

const manList = ["Thomas V.", "George M.", "Johnathan D.", "Jacob C."];

const deptList = ["Engineering", "Finance", "Legal", "Sales", "Service"];

const empList = ["emp1", "emp2", "emp3", "emp4", "emp5", "emp6"];

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
    type: "list",
    message: "What is the employee's role",
    choices: roleList,
    name: "empRole",
  },
  {
    type: "list",
    message: "Who is the employee's manager",
    choices: manList,
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
    type: "list",
    message: "What department does the role belong to",
    choices: deptList,
    name: "roleAddDept",
  },
];

function init() {
  inquirer.prompt(startMenu).then(function (data) {
    console.log(data.choice);
    if (data.choice === "Add Department") {
      inquirer
        .prompt({
          type: "input",
          message: "what is the name of the department you want to add?",
          name: "deptName",
        })
        .then(function (info) {
          console.log(info);
          // db.connect();
          // db.query(
          //   `INSERT INTO department(name) VALUES(${info.deptName});`,
          //   function (err, results) {
          //     if (err) throw err;
          //   }
          // );
        });
    } else if (data.choice === "Add Employee") {
      console.log(data.choice);
      inquirer.prompt(empAdd).then(function (info) {
        console.log(info);
        return init();
      });
    } else if (data.choice === "Update Employee Roles") {
      console.log("WIP");
      return init();
    } else if (data.choice === "View All Roles") {
      console.log(roleList);
      return init();
    } else if (data.choice === "Add Role") {
      inquirer.prompt(roleAdd).then(function (info) {
        console.log(info);
        return init();
      });
    } else if (data.choice === "View All Departments") {
      console.log(deptList);
      return init();
    } else if (data.choice === "View all employees") {
      console.log(empList);
      return init();
    }
  });
}

init();
