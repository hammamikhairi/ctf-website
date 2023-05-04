const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Open a database connection
const db = new sqlite3.Database(path.join(__dirname, 'db', 'mydatabase.db'), (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});
