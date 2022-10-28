import express from 'express';
import productsController from '../controllers/products.controller.js';
import {uploader} from '../utils.js'
const router = express.Router();


router.get('/',productsController.getAllProducts);
router.post('/',uploader.single('thumbnail'),productsController.saveProduct)
router.put('/:pid',productsController.updateProduct);
router.delete('/:pid',productsController.deleteProduct);
router.get('/:pid',productsController.getProductById)

export default router;