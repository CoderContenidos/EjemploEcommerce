import Cart from '../models/Cart.js'
import GenericQueries from './genericQueries.js'

export default class CartService extends GenericQueries{
    constructor(dao){
        super(dao,Cart.model);
    }

    getByWithPopulate = async(params) =>{
        let result = await this.dao.models[Cart.model].findOne(params).populate('products.product')
        return result;
    }
}