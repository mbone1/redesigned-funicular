const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoletable = require("console.table");
const chalk = require("chalk");
// const func = require("./func.js")

//setting up mysql server
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "db"
});

//initial connection to server
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log(chalk.red('HELLO'));
    welcome();
});


//welcome function, stores user's name and passes on to main function
function welcome() {
    inquirer
        .prompt([{
            type: 'prompt',
            message: 'Hello! Welcome to the employee database... Please enter your name',
            name: 'name',
        }, ])
        .then(answers => {
            console.info('Welcome', answers.name, '!');
            main(answers.name);
        });
}

//main tree of questions
function main(userName) {

    inquirer
        .prompt([{
            type: 'list',
            message: 'what would you like to do ' + userName + '?',
            choices: ['View all employees', 'View all roles', 'View all departments', 'Add a department', 'Quit'],
            name: 'choice',
        }, ])
        .then(answers => {
            console.info('Answer:', answers.choice);
            if (answers.choice === 'View all employees') {
                viewAllEmp();
                main(userName);

            } else if (answers.choice === 'View all departments') {
                viewAllDep();
                main(userName);

            } else if (answers.choice === 'View all roles') {
                viewAllRoles();
                main(userName);
            } else if (answers.choice === 'Add a department') {
                newDept();
                main(userName);
            } else {
                console.log("If you did not select quit, there is an error!")
                connection.end();
            }
        });
}


//functions for each query will start here...

//view functions

//function to view all employees
function viewAllEmp() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("__________________________________________________________________________")
        console.log("________press an arrow key to bring the menu back up______________________")
        console.log("__________________________________________________________________________")
        console.log("__________________________________________________________________________")
        console.log("__________________________________________________________________________")
    });
}

//function to view all departments
function viewAllDep() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("__________________________________________________________________________")
        console.log("________press an arrow key to bring the menu back up______________________")
        console.log("__________________________________________________________________________")
        console.log("__________________________________________________________________________")
        console.log("__________________________________________________________________________")
    });
}

//function to view all roles
function viewAllRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("__________________________________________________________________________")
        console.log("________press an arrow key to bring the menu back up______________________")
        console.log("__________________________________________________________________________")
        console.log("__________________________________________________________________________")
        console.log("__________________________________________________________________________")
    });
}

//add functions

function addDept(dept) {
    connection.query(`INSERT INTO department (name) values ('${dept}');`, function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("__________________________________________________________________________")
        console.log("________press an arrow key to bring the menu back up______________________")
        console.log("__________________________________________________________________________")
        console.log("__________________________________________________________________________")
        console.log("__________________________________________________________________________")

    });
}

//secondary questions

function newDept() {
    inquirer
        .prompt([{
            type: 'prompt',
            message: 'What is the name of the department you want to add?',
            name: 'deptName',
        }, ])
        .then(answers => {
            console.info('Welcome', answers.deptName, '!');
            addDept(answers.deptName);
            main();
        });

}




//   * Add departments, roles, employees

//add department -- Nothing needed

// INSERT INTO department (name) values ('Junkers');

//add role -- will need to add department id from department table

// INSERT INTO role (title, salary) values ('Runners', 50000);

//add employee -- will need to add role_id from role table

// INSERT INTO employee (first_name, last_name) values ('Dingus', 'Jones');


//   * Update employee roles