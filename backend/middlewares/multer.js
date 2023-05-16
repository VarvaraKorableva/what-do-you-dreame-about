const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(), // используем память, чтобы хранить файлы
  limits: { fileSize: 10 * 1024 * 1024 }, // ограничение размера файла до 10 МБ
  fileFilter: (req, file, cb) => { // настраиваем фильтр файлов
    // тут можно добавить свои кастомные фильтры
    cb(null, true);
  },
});