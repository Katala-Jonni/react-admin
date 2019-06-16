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


const validate = values => {
  const errors = {};
  const { lastName, surname, phoneNumber, members } = values;
  if (!lastName) {
    errors.lastName = "Обязательное поле";
  }

  if (lastName && !verifyLength(lastName, 2)) {
    errors.lastName = "Введите корректное имя";
  }

  if (!verifyLetter(lastName)) {
    errors.lastName = "Может состоять только из букв";
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
  if (!members || !members.length) {
    errors.members = "Нет данных о записи";
  }

  if (members && members.length) {
    const membersArrayErrors = [];
    members.forEach((member, memberIndex) => {
      const memberErrors = {};
      if (!member || !member.title) {
        memberErrors.title = "Заполните описание услуги";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (member.title && !verifyLength(member.title, 3)) {
        memberErrors.title = "Поле должно быть не меньше 3 символов";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (!member || !member.date) {
        memberErrors.date = "Укажите дату";
        membersArrayErrors[memberIndex] = memberErrors;
      }

      if (!member || !member.start) {
        memberErrors.start = "Укажите начальное время";
        membersArrayErrors[memberIndex] = memberErrors;
      }

      if (!member || !member.end) {
        memberErrors.end = "Укажите конечное время";
        membersArrayErrors[memberIndex] = memberErrors;
      }

      if (member && member.start && moment(member.start).hour() > 20) {
        memberErrors.start = "Запись до 20:00";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (member && member.start && member.end && !(moment(member.end).isAfter(member.start, "minute"))) {
        memberErrors.end = `Должно быть больше ${moment(member.start).format("LT")}`;
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (member && member.end && (moment(member.end).hour() === 20 && moment(member.end).minute() > 0 || moment(member.end).hour() > 20)) {
        console.log(moment(member.end).hour() >= 20);
        memberErrors.end = "Запись до 20:00";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (member && member.start && (moment(member.start).hour() < 10 || moment(member.start).hour() >= 20)) {
        memberErrors.start = "Запись с 10:00 до 19:55";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (member && member.start && member.date && !getDifferenceTime(member.date, member.start)) {
        memberErrors.start = `Время уже прошло!`;
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (!member || !member.resourceId) {
        memberErrors.resourceId = "Выберите имя мастера/Соялярий";
        membersArrayErrors[memberIndex] = memberErrors;
      }
    });

    if (membersArrayErrors.length) {
      errors.members = membersArrayErrors;
    }
  }
  return errors;
};

export default validate;
