const CrudRepository=require('./crud_repository')
const {Airport}=require('../models');
const { Model } = require('sequelize');

class AirportRepository extends CrudRepository {
    constructor(){
        super(Airport);
    }
}
module.exports=AirportRepository;