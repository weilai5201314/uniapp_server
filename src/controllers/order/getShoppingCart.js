const { ShoppingCart } = require('../../mysql/ShoppingCart');
const { Product } = require('../../mysql/Product');
const { User } = require('../../mysql/User');

// 获取购物车信息接口处理函数
const getShoppingCart = async (req, res) => {
    try {
        const { openid } = req.body;

        // 通过 openid 查询用户的 ID
        const user = await User.findOne({ where: { openid } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 查询购物车中所有该用户的商品
        const cartItems = await ShoppingCart.findAll({
            where: { UserID: user.id }
        });

        if (cartItems.length === 0) {
            return res.status(200).json({ message: '购物车为空' });
        }

        // 获取所有产品的 ID
        const productIds = cartItems.map(cartItem => cartItem.ProductID);

        // 查询产品信息
        const products = await Product.findAll({
            where: {
                ProductID: productIds
            }
        });

        // 将产品信息映射到产品 ID 上
        const productsMap = {};
        products.forEach(product => {
            productsMap[product.ProductID] = product;
        });

        // 处理购物车商品信息和图片 URL
        const cartItemsWithUrls = cartItems.map(cartItem => {
            const product = productsMap[cartItem.ProductID];
            const images = ['Image1', 'Image2', 'Image3'].map(field => {
                if (product[field]) {
                    const baseUrl = process.env.HOST + ':' + process.env.PORT + '/';
                    let replacedPath = product[field].replace(/\\/g, '/');
                    return 'http://' + baseUrl + replacedPath.replace('data/', '');
                } else {
                    return null;
                }
            });

            return {
                ...product.toJSON(),
                Image1: images[0],
                Image2: images[1],
                Image3: images[2],
                Quantity: cartItem.Quantity // 使用购物车中的数量
            };
        });

        // 返回购物车商品信息
        res.status(200).json({ cartItems: cartItemsWithUrls });
    } catch (err) {
        console.error('Error fetching shopping cart:', err);
        res.status(500).json({ error: 'Error fetching shopping cart' });
    }
};

module.exports = {
    getShoppingCart
};
