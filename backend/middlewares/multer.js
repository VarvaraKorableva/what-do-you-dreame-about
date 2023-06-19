const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, 'uploads');
  },
  filename: function (_, file, cb) {
    //cb(null, file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
});

// Создание экземпляра multer с настройками хранилища
const upload = multer({ storage });

// Middleware для обработки загрузки файла
const uploadMiddleware = upload.single('image');

module.exports = uploadMiddleware;