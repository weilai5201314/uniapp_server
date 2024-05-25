const {Product} = require('../../mysql/Product');
const {User} = require('../../mysql/User');

// 添加商品接口处理函数
const addProduct = async (req, res) => {
    try {
        const {openid, productName, price, quantity, category, description,  imagePath} = req.body;
        // const {openid} = req.headers;

        // 获取用户信息
        const user = await User.findOne({where: {openid}});

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        // 确保 images 参数存在且是数组
        const image1 = imagePath && imagePath.length > 0 ? imagePath[0] : null;
        const image2 = imagePath && imagePath.length > 1 ? imagePath[1] : null;
        const image3 = imagePath && imagePath.length > 2 ? imagePath[2] : null;


        console.log(openid, productName, price, quantity, category, description, imagePath)
        // 创建商品记录
        const newProduct = await Product.create({
            Title: productName,
            Description: description || null,
            Price: price,
            Category: category,
            Image1: image1,
            Image2: image2,
            Image3: image3,
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
