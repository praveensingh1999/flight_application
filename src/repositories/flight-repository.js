const CrudRepository=require('./crud_repository')
const {Flight}=require('../models');
const { Model } = require('sequelize');

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight);
    }

    async getAllFlights(fliter){
        const response =await Flight.findAll({
            where: filter
        });
        return response;
    }
}
module.exports=FlightRepository;