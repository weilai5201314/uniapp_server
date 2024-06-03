const {ShoppingCart} = require('../../mysql/ShoppingCart');
const {User} = require("../../mysql/User");

const deleteShoppingCart = async (req, res) => {
    try {
        const {openid, productID} = req.body;
        console.log(openid, productID);

        // 通过 openid 查询用户的 ID
        const user = await User.findOne({where: {openid: openid}});

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        // 在购物车中查找是否存在该商品
        const cartItem = await ShoppingCart.findOne({
            where: {
                UserID: user.id,
                ProductID: productID,
            },
        });

        if (!cartItem) {
            return res.status(404).json({error: 'Product not found in shopping cart'});
        }

        // 删除购物车项
        await cartItem.destroy();
        return res.status(201).json({message: '商品已成功从购物车删除'});

    } catch (error) {
        console.error('Error deleting product from shopping cart:', error);
        return res.status(500).json({error: '删除商品从购物车失败'});
    }
};

module.exports = {deleteShoppingCart};
