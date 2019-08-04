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

const validate = values => {
  const errors = {};
  console.log(values);
  const { certificateNumber, typeCertificate, phoneNumber, servicesType, cardNumber, certificateSum, typePay } = values;

  if (!phoneNumber) {
    errors.phoneNumber = "Обязательное поле";
  }

  if (phoneNumber && !verifyNumberPhone(phoneNumber, 6, 12)) {
    errors.phoneNumber = "Номер телефона должен быть от 6 до 11 цифр";
  }

  if (phoneNumber && !verifyNumber(phoneNumber)) {
    errors.phoneNumber = "Номер телефона состоит только из цифр";
  }

  if (!certificateNumber) {
    errors.certificateNumber = "Обязательное поле";
  }

  if (!servicesType) {
    errors.servicesType = "Обязательное поле";
  }

  if (servicesType && !servicesType.length) {
    errors.servicesType = "Обязательное поле";
  }

  if (!certificateSum && typeCertificate === "amount") {
    errors.certificateSum = "Обязательное поле";
  }


  if (certificateSum && !verifyNumber(certificateSum)) {
    errors.certificateSum = "Сумма состоит только из цифр";
  }

  if (!typePay) {
    errors.typePay = "Обязательное поле";
  }

  return errors;
};

export default validate;
