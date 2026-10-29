   const express = require('express');
   const controller = require('../controllers/productController');
   const validate = require('../middleware/validate');
   const { productBody, idParam } = require('../validation/productSchemas');

   const router = express.Router();

   router.get('/', controller.list);
   router.get('/:id', validate(idParam, 'params'), controller.get);
   router.post('/', validate(productBody), controller.create);
   router.put('/:id', validate(idParam, 'params'), validate(productBody), controller.update);
   router.delete('/:id', validate(idParam, 'params'), controller.remove);

   module.exports = router;