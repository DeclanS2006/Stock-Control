   const bcrypt = require('bcryptjs');
   const db = require('./database');

   const seed = db.transaction(() => {
     const userCount = db.prepare('SELECT COUNT(*) AS n FROM users').get().n;
     if (userCount > 0) {
       console.log('Database already has data, skipping seed.');
       return;
     }

     const hash = bcrypt.hashSync('admin123', 10);
     const adminId = db
       .prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)')
       .run('admin', hash, 'admin').lastInsertRowid;

     const insertProduct = db.prepare(
       'INSERT INTO products (sku, name, category, price_pence, reorder_level) VALUES (?, ?, ?, ?, ?)'
     );
     const insertMovement = db.prepare(
       'INSERT INTO stock_movements (product_id, user_id, quantity_change, type, note) VALUES (?, ?, ?, ?, ?)'
     );

     const products = [
       ['TSH-BLK-M', 'Black T-Shirt (M)', 'Clothing', 1499, 10, 50],
       ['TSH-WHT-L', 'White T-Shirt (L)', 'Clothing', 1499, 10, 4],
       ['MUG-CER-01', 'Ceramic Mug', 'Homeware', 799, 15, 40],
       ['NTB-A5-02', 'A5 Notebook', 'Stationery', 599, 20, 120],
       ['PEN-BLU-10', 'Blue Pens (10 pack)', 'Stationery', 399, 25, 60],
     ];

     for (const [sku, name, category, price, reorder, initial] of products) {
       const id = insertProduct.run(sku, name, category, price, reorder).lastInsertRowid;
       insertMovement.run(id, adminId, initial, 'IN', 'Initial stock');
     }

     console.log('Seeded 1 admin user and', products.length, 'products.');
   });

   seed();

   // Show current stock per product (sum of movements)
   const summary = db
     .prepare(
       `SELECT p.sku, p.reorder_level, COALESCE(SUM(m.quantity_change), 0) AS stock
        FROM products p
        LEFT JOIN stock_movements m ON m.product_id = p.id
        GROUP BY p.id`
     )
     .all();
   console.table(summary);