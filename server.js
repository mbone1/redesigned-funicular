//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛ ⮙ ⮘
//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮛
//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮙
//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙ ⮘

const inquirer = require("inquirer");
const mysql = require("mysql");
const figlet = require('figlet')


//setting up mysql server
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "db",
});

//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙initial connection to server
connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
});

//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙welcome function, just for organization
function welcome() {
    inquirer
        .prompt([{
            type: "prompt",
            message: "Hello! Welcome to the employee database, please press enter to continue...",
            name: "nothing",
        }, ])
        .then((answers) => {
            main();
        });
}

//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙main tree of questions
function main() {
    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an Employees role",
                "Quit",
            ],
            name: "choice",
        }, ])
        .then((answers) => {
            if (answers.choice === "View all employees") {
                viewAllEmp();
            } else if (answers.choice === "View all departments") {
                viewAllDep();
            } else if (answers.choice === "View all roles") {
                viewAllRoles();
            } else if (answers.choice === "Add a department") {
                newDept();
            } else if (answers.choice === "Add a role") {
                newRole();
            } else if (answers.choice === "Add an employee") {
                newEmp();
            } else if (answers.choice === "Update an Employees role") {
                upEmp();
            } else if (answers.choice === "Quit") {
                connection.end();
            } else {
                // console.log("If you did not select quit, there is an error!")
                connection.end();
            }
        });
}
//functions for each query will start here...

//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙view functions

//◙◙◙◙◙◙◙function to view all employees
function viewAllEmp() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log()
        main();
    });
}

//◙◙◙◙◙◙◙function to view all departments
function viewAllDep() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        main();
    });
}

//◙◙◙◙◙◙◙function to view all roles
function viewAllRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        main();
    });
}

//◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙add functions
//◙◙◙◙◙◙◙question for adding new department
function newDept() {
    inquirer
        .prompt([{
            type: "prompt",
            message: "What is the name of the department you want to add?",
            name: "deptName",
        }, ])
        .then((answers) => {
            connection.query(
                `INSERT INTO department (name) values ('${answers.deptName}');`,
                function(err, res) {
                    if (err) throw err;
                    // console.log("________press an arrow key to bring the menu back up______________________")
                    main();
                }
            );
        });
}

//◙◙◙◙◙◙◙function to grab all departments to display as choices when adding a role
function newRole() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        newRoleQ(res);
    });
}

//◙◙◙◙◙◙◙question for adding new role
function newRoleQ(burrito) {
    console.log(burrito);
    inquirer
        .prompt([{
                type: "list",
                message: "What department is this role in?",
                name: "roleDept",
                choices: burrito,
            },
            {
                type: "prompt",
                message: "What is the name of this role?",
                name: "roleName",
            },
            {
                type: "prompt",
                message: "What is the salary for this role (gross)?",
                name: "roleSalary",
            },
        ])
        .then((answers) => {
            console.log(answers);
            let x = Object.values(answers);
            let title = x[1];
            let salary = x[2];
            let dept = x[0];
            console.log(dept);
            console.log(title);
            console.log(salary);
            addRole(title, salary, dept);
        });
}

//◙◙◙◙◙◙◙function to add roles
function addRole(title, salary, dept) {
    connection.query(
        `INSERT INTO role (title, salary, department_name) values ('${title}', '${salary}', '${dept}');`,
        function(err, res) {
            if (err) throw err;
        }
    );
    main();
}

//◙◙◙◙◙◙◙function to grab all roles to display as choices when adding an employee and also grab managers
function newEmp() {
    connection.query("SELECT * FROM role", function(err, res1) {
        if (err) throw err;

        connection.query(
            "SELECT * FROM employee WHERE empRole='Manager'",
            function(err, res2) {
                if (err) throw err;

                newEmpQ(res1, res2);
            }
        );
    });
}

//◙◙◙◙◙◙◙question for adding new employee
function newEmpQ(burrito1, burrito2) {
    console.log(burrito1);
    inquirer
        .prompt([{
                type: "prompt",
                message: "What is this employees first name?",
                name: "firstName",
            },
            {
                type: "prompt",
                message: "What is this employees last name?",
                name: "lastName",
            },
            {
                type: "list",
                message: "What role does this employee have?",
                name: "role",
                choices: burrito1,
            },
            {
                type: "list",
                message: "Who is this employees manager?",
                name: "manager",
                choices: burrito2,
            },
        ])
        .then((answers) => {
            console.log(answers);
            let x = Object.values(answers);
            let fName = x[0];
            let lName = x[1];
            let role = x[2];
            let manager = x[3];
            console.log(fName);
            console.log(lName);
            console.log(role);
            console.log(manager);
            addEmp(fName, lName, role, manager);
        });
}

//◙◙◙◙◙◙◙function to add employee
function addEmp(fName, lName, role, manager) {
    connection.query(
        `INSERT INTO employee (first_name, last_name, empRole, manager_name) values ('${fName}', '${lName}', '${role}', '${manager}');`,
        function(err, res) {
            if (err) throw err;
        }
    );
    main();
}



//◙◙◙◙◙◙◙
function upEmp() {
    connection.query("SELECT * FROM role", function(err, res1) {
        if (err) throw err;

        connection.query(
            "SELECT first_name last_name FROM employee",
            function(err, res2) {
                if (err) throw err;
                console.log(res2)
                updEmpQ(res1, res2);
            }
        );
    });
}

//◙◙◙◙◙◙◙question for updating employee roles
function updEmpQ(burrito1, burrito2) {
    console.log(burrito1);
    inquirer
        .prompt([{
                type: "list",
                message: "Which employee would you like to update?",
                name: "empName",
                choices: burrito2,
            },
            {
                type: "list",
                message: "What role are they changing to?",
                name: "role",
                choices: burrito1,
            },
        ])
        .then((answers) => {
            console.log(answers);
            let x = Object.values(answers);
            let fName = x[0];
            let role = x[1];
            console.log(fName)
            console.log(role)
            updRole(fName, role);

        });
}

//◙◙◙◙◙◙◙function to update employees roles
function updRole(fName, role) {
    connection.query(
        `UPDATE employee SET empRole = '${role}' WHERE first_name = '${fName}';`,
        function(err, res) {
            if (err) throw err;
        }
    );
    main();
}

welcome();