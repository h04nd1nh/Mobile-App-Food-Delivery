const { Food } = require('../model/model');
const mongoose = require('mongoose');


const foodController = {

    // Get all of food 
    getAllFood: async(req,res) => {
        try {
            const allFood = await Food.find();
            res.status(200).json(allFood);

        } catch (err) {
            res.status(500);
        }
    },

    // Get food by id
    getFood: async(req, res) => {
        try {
            
            const foodId = new mongoose.Types.ObjectId(req.query.id);
            const food = await Food.findOne({
                _id: foodId
              });
            
            if (food) {
                res.status(200).json(food);
            } 
            else {
                res.status(404).json({message: 'food not found'});
            } 

        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}

module.exports = foodController;