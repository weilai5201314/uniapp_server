const {Product} = require('../../mysql/Product');
const {User} = require('../../mysql/User');

// 添加商品接口处理函数
const addProduct = async (req, res) => {
    try {
        const {openid, productName, price, quantity, category, description, images} = req.body;
        // const {openid} = req.headers;

        // 获取用户信息
        const user = await User.findOne({where: {openid}});

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        console.log(openid, productName, price, quantity, category, description, images)
        // 创建商品记录
        const newProduct = await Product.create({
            Title: productName,
            Description: description||"无",
            Price: price,
            Category: category,
            // Image1: images[0] || null,
            // Image2: images[1] || null,
            // Image3: images[2] || null,
            Quantity: quantity && quantity > 1 ? quantity : 1, // 默认设置数量为 1
            userid: user.id,
        });

        res.status(201).json({message: 'Product added successfully', product: newProduct});
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({error: 'Error adding product'});
    }
};

module.exports = {
    addProduct
};
