const fs = require('fs');
const path = require('path');
const multer = require('multer');

// 创建 Multer 配置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 设置文件保存的目录路径
        const openid = req.body.openid;
        const uploadDir = path.join(__dirname, `../../../data/images/${openid}`);
        // 创建目录（如果不存在）
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, {recursive: true});
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);

    }
});

// 创建 Multer 实例
const upload = multer({storage: storage}).single('file'); // 指定单个文件上传

// 上传图片的处理函数
const uploadImage = async (req, res) => {
    // 使用 Multer 中间件处理上传的文件
    upload(req, res, (err) => {
        if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).json({error: 'Error uploading image'});
        }

        // 获取上传的文件信息
        const file = req.file;

        // 如果没有上传文件，则返回错误
        if (!file) {
            return res.status(400).json({error: 'No file uploaded'});
        }

        // 返回存储文件的相对路径给客户端
        const relativePath = path.relative(path.join(__dirname, '../../../'), file.path);
        res.status(200).json({imagePath: relativePath});
    });
};

module.exports = {
    uploadImage
};
