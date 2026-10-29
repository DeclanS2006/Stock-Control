   const productModel = require('../models/productModel');

   function isDuplicateSku(err) {
     return err.code === 'SQLITE_CONSTRAINT_UNIQUE';
   }

   // GET /api/products
   function list(req, res) {
     res.json(productModel.getAll());
   }

   // GET /api/products/:id
   function get(req, res) {
     const product = productModel.getById(Number(req.params.id));
     if (!product) {
       return res.status(404).json({ error: 'Product not found' });
     }
     res.json(product);
   }

   // POST /api/products
   function create(req, res) {
     try {
       const product = productModel.create(req.body);
       res.status(201).json(product);
     } catch (err) {
       if (isDuplicateSku(err)) {
         return res.status(409).json({ error: 'A product with that SKU already exists' });
       }
       throw err;
     }
   }

   // PUT /api/products/:id
   function update(req, res) {
     try {
       const product = productModel.update(Number(req.params.id), req.body);
       if (!product) {
         return res.status(404).json({ error: 'Product not found' });
       }
       res.json(product);
     } catch (err) {
       if (isDuplicateSku(err)) {
         return res.status(409).json({ error: 'A product with that SKU already exists' });
       }
       throw err;
     }
   }

   // DELETE /api/products/:id
   function remove(req, res) {
     const id = Number(req.params.id);

     if (productModel.hasMovements(id)) {
       return res
         .status(409)
         .json({ error: 'Product has stock history and cannot be deleted' });
     }
     if (!productModel.remove(id)) {
       return res.status(404).json({ error: 'Product not found' });
     }
     res.status(204).end();
   }

   module.exports = { list, get, create, update, remove };