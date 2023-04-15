const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHnadler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  updateAllProductSchema,
  getProductSchema,
  deleteProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get(
  '/:id',
  validatorHnadler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHnadler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({ newProduct });
  }
);

router.patch(
  '/:id',
  validatorHnadler(getProductSchema, 'params'),
  validatorHnadler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({ product });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHnadler(getProductSchema, 'params'),
  validatorHnadler(updateAllProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({ product });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHnadler(deleteProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
