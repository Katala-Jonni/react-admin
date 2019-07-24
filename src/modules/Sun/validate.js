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

const isOneOfType = data => {
  const options = [
    {
      label: "30 минут",
      value: "30 минут"
    },
    {
      label: "50 минут",
      value: "50 минут"
    },
    {
      label: "100 минут",
      value: "100 минут"
    },
    {
      label: "200 минут",
      value: "200 минут"
    }
  ];
  return options.find(item => item.value === data);
};

const validate = values => {
  const errors = {};
  const { lastName, surname, phoneNumber, name, typeCard, cardNumber } = values;
  if (!lastName) {
    errors.lastName = "Обязательное поле";
  }

  if (lastName && !verifyLength(lastName, 2)) {
    errors.lastName = "Введите корректную фамилию";
  }

  if (!verifyLetter(lastName)) {
    errors.lastName = "Может состоять только из букв";
  }

  if (!name) {
    errors.name = "Обязательное поле";
  }

  if (name && !verifyLength(name, 2)) {
    errors.name = "Введите корректное имя";
  }

  if (!verifyLetter(name)) {
    errors.name = "Может состоять только из букв";
  }

  if (!surname) {
    errors.surname = "Обязательное поле";
  }

  if (surname && !verifyLength(surname, 3)) {
    errors.surname = "Введите корректное отчество";
  }

  if (!verifyLetter(surname)) {
    errors.surname = "Может состоять только из букв";
  }

  if (!phoneNumber) {
    errors.phoneNumber = "Обязательное поле";
  }

  if (phoneNumber && !verifyNumberPhone(phoneNumber, 6, 12)) {
    errors.phoneNumber = "Номер телефона должен быть от 6 до 11 цифр";
  }

  if (phoneNumber && !verifyNumber(phoneNumber)) {
    errors.phoneNumber = "Номер телефона состоит только из цифр";
  }

  if (!cardNumber) {
    errors.cardNumber = "Обязательное поле";
  }

  if (cardNumber && !verifyNumberPhone(cardNumber, 11, 12)) {
    errors.cardNumber = "Номер должен содержать 11 цифр";
  }

  if (cardNumber && !verifyNumber(cardNumber)) {
    errors.cardNumber = "Номер состоит только из цифр";
  }

  if (!typeCard) {
    errors.typeCard = "Обязательное поле";
  }

  if (typeCard && !isOneOfType(typeCard)) {
    errors.typeCard = "Выберите корректный тип";
  }
  return errors;
};

export default validate;
