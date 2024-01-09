const CrudRepository=require('./crud_repository')
const {Airplane}=require('../models');
const { Model } = require('sequelize');

class AirplaneRepository extends CrudRepository {
    constructor(){
        super(Airplane);
    }
}
module.exports=AirplaneRepository;