const mysql = require('mysql');

function getUserDataByZipcode(zipcode, callback) {
    // Create a connection to the database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'your_username',
        password: 'your_password',
        database: 'your_database'
    });

    // Connect to the database
    connection.connect((err) => {
        if (err) throw err;

        // Query the database
        connection.query('SELECT * FROM user WHERE zipcode = ?', [zipcode], (error, results, fields) => {
            // Close the connection
            connection.end();
        });
    });
}