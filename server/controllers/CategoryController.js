const { Category } = require('../model/model');


const cateController = {

    // Get all of cate
    getAllCate: async(req,res) => {
        try {
            const allCate = await Category.find();
            res.status(200).json(allCate);

        } catch (err) {
            res.status(500);
        }
    },

}

module.exports = cateController;