//function to view all employees

//◙◙◙◙◙◙◙function to update employees
function updRole(fName, role) {
    connection.query(
        `UPDATE employee SET empRole = '${role}' WHERE first_name = '${fName}';`,
        function(err, res) {
            if (err) throw err;
        }
    );
    main();
}

module.export = {
    updRole,


};