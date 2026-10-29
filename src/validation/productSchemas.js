   const Joi = require('joi');

   // Rules for the body of a create or update request
   const productBody = Joi.object({
     sku: Joi.string().trim().max(50).required(),
     name: Joi.string().trim().max(120).required(),
     category: Joi.string().trim().max(60).empty('').allow(null).default(null),
     price_pence: Joi.number().integer().min(0).required(),
     reorder_level: Joi.number().integer().min(0).default(0),
   });

   // Rules for the id part of the URL
   const idParam = Joi.object({
     id: Joi.number().integer().positive().required(),
   });

   module.exports = { productBody, idParam };