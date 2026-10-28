   const express = require('express');
   const db = require('../db/database');

   const router = express.Router();

   // GET /api/products - list all products with current stock
   router.get('/', (req, res) => {
     const rows = db
       .prepare(
         `SELECT p.id, p.sku, p.name, p.category, p.price_pence, p.reorder_level,
                 COALESCE(SUM(m.quantity_change), 0) AS stock
          FROM products p
          LEFT JOIN stock_movements m ON m.product_id = p.id
          GROUP BY p.id
          ORDER BY p.name`
       )
       .all();

     const products = rows.map((p) => ({
       ...p,
       low_stock: p.stock <= p.reorder_level,
     }));

     res.json(products);
   });

   module.exports = router;