const inquirer = require("inquirer");
const mysql = require("mysql2");
// const Query = require("mysql2/typings/mysql/lib/protocol/sequences/Query");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "root",
    database: "employees_db",
  },
  console.log(`Connected to the database.`)
);

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

function init() {
  inquirer.prompt(startMenu).then(function (data) {
    console.log(data);
    if (data.options === "Add Department") {
      inquirer
        .prompt({
          type: "input",
          message: "what is the name of the department you want to add?",
          name: "deptName",
        })
        .then(function (info) {
          db.connect();
          db.query(
            `INSERT INTO department(name) VALUES(${info.deptName});`,
            function (err, results) {
              if (err) throw err;
            }
          );
        });
    }
    //  else if(data.options === "Add Employee") {

    // }else if(data.options === ) {

    // }else if(data.options === ) {

    // }else if(data.options === ) {

    // }else if(data.options === ) {

    // }else if(data.options === ) {

    // }
  });
}

init();
