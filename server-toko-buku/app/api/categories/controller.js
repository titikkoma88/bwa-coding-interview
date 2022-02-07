const { Category } = require('../../db/models');

module.exports = {
    getAllCategories: async (req, res, next) => {
        try {
            // console.log(req.user);
            const categories = await Category.findAll({
                where: { user: req.user.id },
                attributes: ['id', 'name']
            });

            res.status(200).json({
                message: 'Success get all categories',
                data: categories,
            });
        } catch (error) {
            next(error);
        }
    },

    createCategories: async (req, res, next) => {
        try {
            const { name } = req.body;

            const categories = await Category.create({
                name: name,
                user: req.user.id,
            });

            res.status(201).json({
                message: 'Success create categories',
                data: categories,
            });
        } catch (error) {
            next(error);
        }
    },

    updateCategories: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const checkCategory = await Category.findOne({
                where: {
                    id: id,
                    user: req.user.id,
                },
            });

            const categories = await checkCategory.update({ name: name });
            res.status(200).json({
                message: 'Success update categories',
                data: categories,
            });
        } catch (error) {
            next(error);
        }
    },
};