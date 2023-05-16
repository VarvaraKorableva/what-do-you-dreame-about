const Reg = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

/*var Reg = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

if(Reg.test(vali)){ stav = true; }
*/



const validateURL = (value) => {
  if (value !== value.match(Reg).join('')) {
    throw new Error('Ссылка не прошла валидацию');
  }
  return value;
};

module.exports = {
  Reg,
  validateURL,
};