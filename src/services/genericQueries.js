export default class GenericQueries{
    constructor(dao,model){
        this.dao = dao;
        this.model = model;
    }
    getBy = async(params)=>{
        return this.dao.findOne(params,this.model);
    }
    getAll = async(params)=>{
        return this.dao.getAll(params,this.model);
    }
    save = async(data) =>{
        return this.dao.insert(data,this.model);
    }
    update = async(id,data)=>{
        data._id=id;
        return this.dao.update(data,this.model);
    }
    delete = async(id)=>{
        return this.dao.delete(id,this.model);
    }
}