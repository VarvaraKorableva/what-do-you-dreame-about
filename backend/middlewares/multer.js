//рабочий
/*
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
*/
//don know
/*
const multer = require('multer');

const avatarsStorage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, 'avatars');
  },
  filename: function (_, file, cb) {
    //cb(null, file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
});

// Хранилище для загружаемых пользователем картинок
const dreamsImgStorage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, 'dreamsImg');
  },
  filename: function (_, file, cb) {
    //cb(null, file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
});

// Middleware для обработки загрузки файлов
const uploadMiddleware = (req, res, next) => {
  const { fieldName } = req.body;

  // Выбор соответствующего хранилища на основе ключевого слова fieldName
  let storage;
  if (fieldName === 'image') {
    storage = multer({ storage: avatarsStorage });
  } else if (fieldName === 'avatar') {
    storage = multer({ storage: dreamsImgStorage });
  }

  // Запуск соответствующего multer middleware для обработки загрузки файла
  if (storage) {
    storage.single(fieldName)(req, res, next);
  } else {
    next(new Error('Некорректное ключевое слово поля загрузки файла'));
  }
};

module.exports = uploadMiddleware;*/

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, 'uploads');
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
});

const upload = multer({ storage });

const uploadMiddleware = upload.single('image');

module.exports = uploadMiddleware;