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
    // console.log("connected as id " + connection.threadId);

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
            choices: ['View all employees', 'View all roles', 'View all departments', 'Add a department', 'Add a role', 'Quit'],
            name: 'choice',
        }, ])
        .then(answers => {
            if (answers.choice === 'View all employees') {
                viewAllEmp();

            } else if (answers.choice === 'View all departments') {
                viewAllDep();

            } else if (answers.choice === 'View all roles') {
                viewAllRoles();

            } else if (answers.choice === 'Add a department') {
                newDept();

            } else if (answers.choice === 'Add a role') {
                newRole();

            } else if (answers.choice === 'Quit') {
                connection.end();
            } else {
                // console.log("If you did not select quit, there is an error!")
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
        main();
    });
}

// function to view all departments
function viewAllDep() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        main();
    });
}

//function to view all roles
function viewAllRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        main();
    });
}

//add functions

// //function to add departments
// function addDept(dept) {
//     connection.query(`INSERT INTO department (name) values ('${dept}');`, function(err, res) {
//         if (err) throw err;
//         console.log("__________________________________________________________________________")
//         console.log("________press an arrow key to bring the menu back up______________________")
//         console.log("__________________________________________________________________________")
//         console.log("__________________________________________________________________________")
//         console.log("__________________________________________________________________________")
//         main();
//     });
// }

// function to add roles

function addRole(role) {
    console.log(role)
        // connection.query(`INSERT INTO department (name) values ('${dept}');`, function(err, res) {
        //     if (err) throw err;
        //     console.log("__________________________________________________________________________")
        //     console.log("________press an arrow key to bring the menu back up______________________")
        //     console.log("__________________________________________________________________________")
        //     console.log("__________________________________________________________________________")
        //     console.log("__________________________________________________________________________")

    // });
    main();
}


//secondary question functions

//question for adding new department
function newDept() {
    inquirer
        .prompt([{
            type: 'prompt',
            message: 'What is the name of the department you want to add?',
            name: 'deptName',
        }, ])
        .then(answers => {
            connection.query(`INSERT INTO department (name) values ('${answers.deptName}');`, function(err, res) {
                if (err) throw err;
                // console.log("________press an arrow key to bring the menu back up______________________")
                main();
            });
        });

}

function newRole() {
    connection.query("SELECT name FROM department", function(err, res) {
        if (err) throw err;
        newRoleQ(res)
    })
};

// question for adding new role
function newRoleQ(burrito) {
    console.table(burrito)
    inquirer
        .prompt([{
                type: 'prompt',
                message: 'What is the name of the role you want to add?',
                name: 'roleName',
            }, {
                type: 'prompt',
                message: 'What is the salary for this role (gross)?',
                name: 'roleSalary',
            },
            {
                type: 'list',
                message: 'What department is this role in?',
                name: 'roleName',
                choices: burrito,
            },
        ])
        .then(answers => {
            let x = Object.values(answers);
            addRole(x);
        });
}

welcome();


//   * Add departments, roles, employees

//add department -- Nothing needed

// INSERT INTO department (name) values ('Junkers');

//add role -- will need to add department id from department table

// INSERT INTO role (title, salary) values ('Runners', 50000);

//add employee -- will need to add role_id from role table

// INSERT INTO employee (first_name, last_name) values ('Dingus', 'Jones');


//   * Update employee roles