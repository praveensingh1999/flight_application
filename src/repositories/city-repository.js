const CrudRepository=require('./crud_repository')
const {City}=require('../models');
const { Model } = require('sequelize');

class CityRepository extends CrudRepository {
    constructor(){
        super(City);
    }
}
module.exports=CityRepository;