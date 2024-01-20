const CrudRepository=require('./crud_repository')
const {Flight}=require('../models');
const { Model } = require('sequelize');

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight);
    }
}
module.exports=FlightRepository;