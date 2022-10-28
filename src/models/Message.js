import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default class Message{
    constructor(data){
        this.data=data;
    }
    static get model(){
        return 'Messages';
    }
    static get schema(){
        return{
            author:{
                type:Schema.Types.ObjectId,
                ref:"Users"
            },
            content:String
        }
    }
}