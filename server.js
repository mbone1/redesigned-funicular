const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoletable = require("console.table");
const chalk = require("chalk");
// const func = require("./func.js")


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

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log(chalk.red('HELLO'));
    welcome();
});

function welcome() {

    inquirer
        .prompt([{
            type: 'list',
            message: 'what would you like to do?',
            choices: ['View all employees', 'View all roles', 'View all departments', 'Quit'],
            name: 'choice',
        }, ])
        .then(answers => {
            console.info('Answer:', answers.choice);
            if (answers.choice === 'View all employees') {
                viewAllEmp();
                welcome();

            } else if (answers.choice === 'View all departments') {
                viewAllDep();
                welcome();

            } else if (answers.choice === 'View all roles') {
                viewAllRoles();
                welcome();

            } else {
                console.log("If you did not select quit, there is an error!")
                connection.end();
            }
        });
}



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

//   * View departments, roles, employees


// Build a command-line application that at a minimum allows the user to:

//   * Add departments, roles, employees

//add department -- Nothing needed

// INSERT INTO department (name) values ('Junkers');

//add role -- will need to add department id from department table

// INSERT INTO role (title, salary) values ('Runners', 50000);

//add employee -- will need to add role_id from role table

// INSERT INTO employee (first_name, last_name) values ('Dingus', 'Jones');


//   * Update employee roles