// db.js

const sqlite3 = require('sqlite3').verbose();
const dbName = 'users.db';
const db = new sqlite3.Database(dbName);

// Créez la table "users" si elle n'existe pas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      firstName TEXT,
      lastName TEXT,
      service TEXT,
      function TEXT
    )
  `);
});

module.exports = db;
