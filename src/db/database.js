   const Database = require('better-sqlite3');
   const fs = require('fs');
   const path = require('path');

   const dbPath = path.join(__dirname, '..', '..', 'stock.db');
   const db = new Database(dbPath);

   // SQLite ignores foreign keys unless this is switched on
   db.pragma('foreign_keys = ON');

   // Create the tables if they don't exist yet
   const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
   db.exec(schema);

   module.exports = db;