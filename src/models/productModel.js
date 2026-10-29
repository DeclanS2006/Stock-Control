   const db = require('../db/database');

   // Shared query: every product with its current stock (sum of movements)
   const SELECT_WITH_STOCK = `
     SELECT p.id, p.sku, p.name, p.category, p.price_pence, p.reorder_level,
            COALESCE(SUM(m.quantity_change), 0) AS stock
     FROM products p
     LEFT JOIN stock_movements m ON m.product_id = p.id
   `;

   function withLowStock(row) {
     return { ...row, low_stock: row.stock <= row.reorder_level };
   }

   function getAll() {
     const rows = db.prepare(`${SELECT_WITH_STOCK} GROUP BY p.id ORDER BY p.name`).all();
     return rows.map(withLowStock);
   }

   function getById(id) {
     const row = db.prepare(`${SELECT_WITH_STOCK} WHERE p.id = ? GROUP BY p.id`).get(id);
     return row ? withLowStock(row) : null;
   }

   function create(data) {
     const result = db
       .prepare(
         `INSERT INTO products (sku, name, category, price_pence, reorder_level)
          VALUES (@sku, @name, @category, @price_pence, @reorder_level)`
       )
       .run(data);
     return getById(Number(result.lastInsertRowid));
   }

   function update(id, data) {
     const result = db
       .prepare(
         `UPDATE products
          SET sku = @sku, name = @name, category = @category,
              price_pence = @price_pence, reorder_level = @reorder_level
          WHERE id = @id`
       )
       .run({ ...data, id });
     return result.changes === 0 ? null : getById(id);
   }

   function hasMovements(id) {
     return Boolean(
       db.prepare('SELECT 1 FROM stock_movements WHERE product_id = ? LIMIT 1').get(id)
     );
   }

   function remove(id) {
     return db.prepare('DELETE FROM products WHERE id = ?').run(id).changes > 0;
   }

   module.exports = { getAll, getById, create, update, hasMovements, remove };