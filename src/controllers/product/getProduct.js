const { Product } = require('../../mysql/Product');
// const { User } = require('../../mysql/User');

// 获取所有商品信息接口处理函数
const getAllProducts = async (req, res) => {
    try {
        // 查询数据库中的所有商品记录，并包含用户信息
        const products = await Product.findAll({
            // 关联用户信息表
            // include: [
            //     {
            //         model: User,
            //         attributes: ['openid']
            //     }
            // ]
        });

        // 返回商品信息
        res.status(200).json({ products });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Error fetching products' });
    }
};

module.exports = {
    getAllProducts
};
