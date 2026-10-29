   // Returns middleware that checks part of the request against a Joi schema
   function validate(schema, source = 'body') {
     return (req, res, next) => {
       const { error, value } = schema.validate(req[source] ?? {}, {
         abortEarly: false, // report every problem
         stripUnknown: true, // drop any fields not asked for
       });

       if (error) {
         return res.status(400).json({
           error: 'Validation failed',
           details: error.details.map((d) => d.message),
         });
       }

       if (source === 'body') req.body = value; // use the cleaned data from here on
       next();
     };
   }

   module.exports = validate;