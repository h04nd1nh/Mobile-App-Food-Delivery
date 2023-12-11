const { Food } = require('../model/model');


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

}

module.exports = foodController;