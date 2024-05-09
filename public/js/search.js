const mysql = require('mysql');

function getUserDataByZipcode(zipcode, callback) {

    // Create a connection to the database
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    // Connect to the database
    connection.connect((err) => {
        if (err) throw err;

        // Perform a query
        connection.query('SELECT * FROM user WHERE zipcode = ?', [zipcode], (error, results, fields) => {
        
            connection.end();
        });
    });
}