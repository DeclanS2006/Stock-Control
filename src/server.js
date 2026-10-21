   const express = require('express');
   const db = require('./db/database');

   const app = express();
   const PORT = process.env.PORT || 3000;

   app.use(express.json());
   app.use(express.static('public'));

   app.get('/api/health', (req, res) => {
     const tables = db
       .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'")
       .all()
       .map((t) => t.name);
     res.json({ status: 'ok', tables });
   });

   app.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`);
   });