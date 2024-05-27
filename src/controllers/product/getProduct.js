// const {Product} = require('../../mysql/Product');
// // const { User } = require('../../mysql/User');
//
// // 获取PruductID字段单独查询某个商品信息
// const getProducts = async (req, res) => {
//     try {
//
//         // 根据id查询某个商品
//
//         // 将相对路径转换成完整的图片 URL
//         const productsWithUrls = products.map(product => {
//             const images = ['Image1', 'Image2', 'Image3'].map(field => {
//                 if (product[field]) {
//                     const baseUrl = process.env.HOST + ':' + process.env.PORT + '/';
//                     // 将所有的反斜杠替换为正斜杠
//                     let replacedPath = product[field].replace(/\\/g, '/');
//                     // 将 data/ 替换为空字符串
//                     return 'http://' + baseUrl + replacedPath.replace('data/', '');
//                 } else {
//                     return null;
//                 }
//             });
//             return {
//                 ...product.toJSON(),
//                 Image1: images[0],
//                 Image2: images[1],
//                 Image3: images[2]
//             };
//         });
//
//         // 返回商品信息
//         res.status(200).json({products: productsWithUrls});
//     } catch (err) {
//         console.error('Error fetching products:', err);
//         res.status(500).json({error: 'Error fetching products'});
//     }
// };
//
// module.exports = {
//     getAllProducts
// };
