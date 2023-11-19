const Message = require('../models/message');

// Получение всех сообщений, отправленных вам другими пользователями
exports.getAllMessagesToMe = (req, res, next) => {
  const myUserId = req.params.userId; // Предполагается, что в запросе приходит ID вашего пользователя

  Message.find({ receiver: myUserId })
    .populate('user', 'username')
    .populate('receiver', 'username')
    .then((messages) => {
      res.status(200).json({ messages: messages });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Ошибка получения сообщений для вас', error: error.message });
    });
};

// Отправка сообщения конкретному пользователю
exports.sendMessageToUser = (req, res, next) => {
  const senderId = req.body.senderId; // ID отправителя
  const receiverId = req.body.receiverId; // ID получателя
  const content = req.body.content; // Текст сообщения

  const newMessage = new Message({
    content: content,
    user: senderId,
    receiver: receiverId,
  });

  newMessage.save()
    .then((message) => {
      res.status(201).json({ message: 'Сообщение успешно отправлено', data: message });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Ошибка отправки сообщения', error: error.message });
    });
};

// Получение сообщений от конкретного пользователя ко мне
exports.getMessagesFromUserToMe = (req, res, next) => {
  const myUserId = req.params.userId; // ID вашего пользователя
  const senderId = req.params.senderId; // ID отправителя (другого пользователя)

  Message.find({ user: senderId, receiver: myUserId })
    .populate('user', 'username')
    .populate('receiver', 'username')
    .then((messages) => {
      res.status(200).json({ messages: messages });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Ошибка получения сообщений от пользователя', error: error.message });
    });
};

// Получение всех моих сообщений к конкретному пользователю
exports.getAllMyMessagesToUser = (req, res, next) => {
  const myUserId = req.params.userId; // ID вашего пользователя
  const receiverId = req.params.receiverId; // ID получателя (другого пользователя)

  Message.find({ user: myUserId, receiver: receiverId })
    .populate('user', 'username')
    .populate('receiver', 'username')
    .then((messages) => {
      res.status(200).json({ messages: messages });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Ошибка получения ваших сообщений к пользователю', error: error.message });
    });
};


module.exports = {
    getAllMessagesToMe,
    sendMessageToUser,
    getMessagesFromUserToMe,
    getAllMyMessagesToUser
  };