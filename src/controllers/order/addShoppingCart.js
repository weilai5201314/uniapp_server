const {ShoppingCart} = require('../../mysql/ShoppingCart');
const {Product} = require('../../mysql/Product');
const {User} = require("../../mysql/User");

const addShoppingCart = async (req, res) => {
    try {
        const {openid, productID} = req.body
        console.log(openid, productID)
        // 通过 openid 查询用户的 ID
        const user = await User.findOne({where: {openid: openid}});

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        // 检查商品是否存在
        const product = await Product.findByPk(productID);
        if (!product) {
            return res.status(404).json({error: 'Product not found'});
        }

        // 在购物车中查找是否已经存在该商品
        const CartItem = await ShoppingCart.findOne({
            where: {
                UserID: user.id,
                ProductID: product.ProductID,
            },
        });
        console.log(user.id,product.ProductID);
        if (CartItem) {
            // 如果商品已经存在购物车中，更新数量
            CartItem.Quantity++;
            await CartItem.save();
            return res.status(201).json({message: '购物车已存在该商品，数量已更新'});
        } else {
            // 如果购物车中不存在该商品，则添加新的购物车项
            await ShoppingCart.create({
                UserID: user.id,
                ProductID: productID,
                Quantity: 1, // 默认数量为1
            });
            return res.status(201).json({message: '商品已成功添加到购物车'});
        }
    } catch (error) {
        console.error('Error adding product to shopping cart:', error);
        return res.status(500).json({error: '添加商品到购物车失败'});
    }
};

module.exports = {addShoppingCart};