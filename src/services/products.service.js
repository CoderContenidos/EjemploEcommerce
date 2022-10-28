import Product from '../models/Product.js';
import GenericQueries from './genericQueries.js'

export default class ProductService extends GenericQueries{
    constructor(dao){
        super(dao,Product.model);
    }
}