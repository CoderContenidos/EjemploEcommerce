import mongoose from 'mongoose';
let Schema = mongoose.Schema;

export default class Product{
    constructor(data){
        this.data=data;
    }
    static get model(){
        return "Products";
    }
    static get schema(){
        return{
            title:String,
            description:String,
            price:Number,
            code:String,
            stock:Number,
            thumbnail:String,
            status:{
                type:String,
                default:"available"
            }
        }
    }
}