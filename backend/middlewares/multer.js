const multer = require('multer');

const uploadSingle = (req, res, next) => {
  upload.single('file')(req, res, function (error) {
    if (error instanceof multer.MulterError) {
      // Обработка ошибки Multer
      return res.status(400).json({ error: error.message });
    } else if (error) {
      // Обработка других ошибок
      return res.status(500).json({ error: 'Server error' });
    }
    next();
  });
};
