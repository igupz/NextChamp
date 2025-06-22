const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dbPath = path.join(__dirname, "database.db");
const exists = fs.existsSync(dbPath);

const db = new sqlite3.Database(dbPath);

if (!exists) {
  db.serialize(() => {
    db.run(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      email TEXT,
      nickname TEXT,
      birthdate TEXT,
      platform TEXT,
      role TEXT DEFAULT 'user'
    )`);

    db.run(`CREATE TABLE events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      platform TEXT,
      date TEXT,
      closed INTEGER DEFAULT 0
    )`);

    db.run(`CREATE TABLE registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      event_id INTEGER
    )`);
  });
}

module.exports = db;
