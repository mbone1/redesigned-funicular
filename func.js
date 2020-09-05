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

//function to view all of the departments
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



module.export = {
    viewAllDep,
    viewAllRoles,
    viewAllEmp,

};