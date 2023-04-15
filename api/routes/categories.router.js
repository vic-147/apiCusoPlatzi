const express = require('express');
// const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/:categoryId/products/:productsId', (req, res) => {
  const { categoryId, productsId } = req.params;
  res.json({
    categoryId,
    productsId,
  });
});

module.exports = router;
