import moment from "moment";

const getDifferenceTime = (date, start) => {
  const time = moment(date).set({ "hour": moment(start).hour(), "minute": moment(start).minute() });
  const a = moment(time);
  const b = moment();
  if (a.diff(b) < 0) {
    return null;
  }
  return true;
};


const verifyNumber = value => {
  var numberRex = new RegExp("^[0-9]+$");
  if (numberRex.test(value)) {
    return true;
  }
  return false;
};

const verifyUrl = value => {
  const reg = `(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w\\.-]*)*\\/?`;
  const numberRex = new RegExp(reg);
  if (numberRex.test(value)) {
    return true;
  }
  return false;
};

const verifyLetter = value => {
  var numberRex = new RegExp("^[a-zA-Zа-яА-ЯЁё ]+$");
  if (numberRex.test(value)) {
    return true;
  }
  return false;
};

const verifyNumberPhone = (value, lengthStart, lengthEnd) => {
  if (verifyNumber(value) && value.length >= lengthStart && value.length < lengthEnd) {
    return true;
  }
  return false;
};

const verifyLength = (value, lth) => {
  if (value.trim().length >= lth) {
    return true;
  }
  return false;
};


const validate = values => {
  const errors = {};
  const { title, icon, img, price, category } = values;
  // const { surname, name, middleName, phone, members, labels } = values;
  if (!title) {
    errors.title = "Обязательное поле";
  }

  if (!category) {
    errors.category = "Выберите категорию";
  }

  if (title && !verifyLength(title, 2)) {
    errors.title = "Введите корректное название";
  }

  if (!verifyLetter(title)) {
    errors.title = "Может состоять только из букв";
  }
  if (!icon) {
    errors.icon = "Обязательное поле";
  }

  if (icon && !verifyUrl(icon)) {
    errors.icon = "Введите корректный url";
  }

  if (!img) {
    errors.img = "Обязательное поле";
  }

  if (img && !verifyUrl(img)) {
    errors.img = "Введите корректный url";
  }

  if (!price) {
    errors.price = "Обязательное поле";
  }

  if (price && !verifyNumberPhone(price, 1, 10)) {
    errors.price = "Цена должна быть от 1 до 10 цифр";
  }

  if (price && !verifyNumber(price)) {
    errors.price = "Цена состоит только из цифр";
  }
  return errors;
};

export default validate;
