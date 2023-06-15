const User = require('./models/user');
require('dotenv').config();
//import cors from 'cors';

const fs = require('fs'); // Подключаем модуль fs для работы с файлами
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');

const { login, createUser, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
//const multer = require('./middlewares/multer');
const NotFoundError = require('./Errors/NotFoundError');
const handleErrors = require('./middlewares/errors');
const { Reg } = require('./utils/const');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const multer = require('multer');

const { PORT = 3000 } = process.env;
const app = express();

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

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(requestLogger);

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://localhost:3001',
    'https://localhost:3000',
    
  ],
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});
app.use('/uploads', express.static('uploads'));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(Reg),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signout', logout);


app.use(require('./routes/usersForAll'));
app.use(require('./routes/myFriendDreams'));
app.use(auth);

//

app.post('/upload', upload.single('image'), (req, res) => {
  const userId = req.body.userId;
  const imageBuffer = req.file.buffer;

  User.findByIdAndUpdate(userId, { avatar: `/uploads/${req.file.filename}` }, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send('Некорректный идентификатор пользователя');
      } else {
        res.status(500).send('Произошла ошибка при обновлении пользователя');
      }
    });
});
/*
app.patch('/upload', upload.single('image'), (req, res) => {
  const userId = req.body.userId;
  const imageBuffer = req.file.buffer;

  const filename = `${userId}_${Date.now()}.jpg`; // Генерируем уникальное имя файла
  const filePath = path.join(__dirname, 'uploads', filename); // Путь к файлу

  // Сохраняем файл на сервере
  fs.writeFile(filePath, imageBuffer, (error) => {
    if (error) {
      console.error('Произошла ошибка при сохранении файла:', error);
      res.status(500).send('Произошла ошибка при сохранении файла');
      return;
    }

    // Обновляем пользователя в базе данных
    User.findByIdAndUpdate(userId, { avatar: `/uploads/${filename}` }, { new: true })
      .then((user) => {
        res.send(user);
      })
      .catch((error) => {
        if (error.name === 'CastError') {
          res.status(400).send('Некорректный идентификатор пользователя');
        } else {
          res.status(500).send('Произошла ошибка при обновлении пользователя');
        }
      });
  });
});*/

//рабочий
app.patch('/upload', upload.single('image'), (req, res) => {
  const userId = req.body.userId;
  const imageBuffer = req.file.buffer;
  
  User.findByIdAndUpdate(userId, { avatar: `/uploads/${req.file.filename}` }, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send('Некорректный идентификатор пользователя');
      } else {
        res.status(500).send('Произошла ошибка при обновлении пользователя');
      }
    });
});
/*
app.patch('/upload', upload.single('image'), (req, res) => {
  const userId = req.body.userId;
  const imageBuffer = req.file.buffer;
  
  User.findByIdAndUpdate(userId, { avatar: imageBuffer }, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send('Некорректный идентификатор пользователя');
      } else {
        res.status(500).send('Произошла ошибка при обновлении пользователя');
      }
    });
});*/

app.use(require('./routes/users'));
app.use(require('./routes/dreams'));
app.use(require('./routes/importantDates'));
app.use(require('./routes/subscription'));


app.all('*', () => {
  throw new NotFoundError('Страница не найдена');
});


//mongoose.set("strictQuery", true);
/*
mongoose.connect('mongodb://localhost:27017/dreamsAbout', 
{ 
  useNewUrlParser: true, 
  family: 4 
});*/
mongoose 
 .connect('mongodb://localhost:27017/dreamsAbout', {
        useNewUrlParser: true,
        family: 4
  })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));
/*
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB");
});*/

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = { app };
