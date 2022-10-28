import mongoose from 'mongoose';

let Schema = mongoose.Schema;

export default class Cart {
    constructor(data){
        this.data = data;
    }

    static get model(){
        return "Carts";
    }

    static get schema(){
        return{
            products:[
                {
                    product:{
                        type:Schema.Types.ObjectId,
                        ref:"Products"
                    },
                    quantity:{
                        type:Number,
                        default:1
                    }
                }
            ]
        }
    }
}