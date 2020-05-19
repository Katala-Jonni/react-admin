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
  const { surname, name, middleName, phone, members, labels, defaultPercent } = values;
  if (!surname) {
    errors.surname = "Обязательное поле";
  }

  if (surname && !verifyLength(surname, 2)) {
    errors.surname = "Введите корректное имя";
  }

  if (!verifyLetter(surname)) {
    errors.surname = "Может состоять только из букв";
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

  if (!middleName) {
    errors.middleName = "Обязательное поле";
  }

  // if (!labels) {
  //   errors.labels = "Обязательное поле";
  // }
  //
  // if (!labels && !labels.length) {
  //   errors.labels = "Выберите метку";
  // }

  if (middleName && !verifyLength(middleName, 3)) {
    errors.middleName = "Введите корректное отчество";
  }

  if (!verifyLetter(middleName)) {
    errors.middleName = "Может состоять только из букв";
  }

  if (!phone) {
    errors.phone = "Обязательное поле";
  }

  if (phone && !verifyNumberPhone(phone, 6, 12)) {
    errors.phone = "Номер телефона должен быть от 6 до 11 цифр";
  }

  if (phone && !verifyNumber(phone)) {
    errors.phone = "Номер телефона состоит только из цифр";
  }

  if (!defaultPercent) {
    errors.defaultPercent = "Обязательное поле";
  }

  if (defaultPercent && !verifyNumber(defaultPercent)) {
    errors.defaultPercent = "Состоит только из цифр";
  }
  // if (!members || !members.length) {
  //   errors.members = "Нет данных о записи";
  // }

  if (members && members.length) {
    const membersArrayErrors = [];
    members.forEach((member, memberIndex) => {
      const memberErrors = {};
      // if (!member || !member.title) {
      //   memberErrors.title = "Заполните описание услуги";
      //   membersArrayErrors[memberIndex] = memberErrors;
      // }
      // if (member.title && !verifyLength(member.title, 3)) {
      //   memberErrors.title = "Поле должно быть не меньше 3 символов";
      //   membersArrayErrors[memberIndex] = memberErrors;
      // }
      if (!member || !member.servicesGroup) {
        memberErrors.servicesGroup = "Заполните вид услуги";
        membersArrayErrors[memberIndex] = memberErrors;
      }

      if (!member || !member.count) {
        memberErrors.count = "Укажите значение";
        membersArrayErrors[memberIndex] = memberErrors;
      }

      if (member && member.count && !verifyNumber(member.count)) {
        memberErrors.count = "Значение состоит только из цифр";
        membersArrayErrors[memberIndex] = memberErrors;
      }

      if (member && (member.count < 10 || member.count > 100)) {
        memberErrors.count = "Значение в пределах от 10 до 100";
        membersArrayErrors[memberIndex] = memberErrors;
      }

      // if (!member || !member.start) {
      //   memberErrors.start = "Укажите начальное время";
      //   membersArrayErrors[memberIndex] = memberErrors;
      // }
      //
      // if (!member || !member.end) {
      //   memberErrors.end = "Укажите конечное время";
      //   membersArrayErrors[memberIndex] = memberErrors;
      // }

      // if (member && member.start && moment(member.start).hour() > 20) {
      //   memberErrors.start = "Запись до 20:00";
      //   membersArrayErrors[memberIndex] = memberErrors;
      // }
      // if (member && member.start && member.end && !(moment(member.end).isAfter(member.start, "minute"))) {
      //   memberErrors.end = `Должно быть больше ${moment(member.start).format("LT")}`;
      //   membersArrayErrors[memberIndex] = memberErrors;
      // }
      // if (member && member.end && (moment(member.end).hour() === 20 && moment(member.end).minute() > 0 || moment(member.end).hour() > 20)) {
      //   console.log(moment(member.end).hour() >= 20);
      //   memberErrors.end = "Запись до 20:00";
      //   membersArrayErrors[memberIndex] = memberErrors;
      // }
      // if (member && member.start && (moment(member.start).hour() < 10 || moment(member.start).hour() >= 20)) {
      //   memberErrors.start = "Запись с 10:00 до 19:55";
      //   membersArrayErrors[memberIndex] = memberErrors;
      // }
      // if (member && member.start && member.date && !getDifferenceTime(member.date, member.start)) {
      //   memberErrors.start = `Время уже прошло!`;
      //   membersArrayErrors[memberIndex] = memberErrors;
      // }
      // if (!member || !member.resourceId) {
      //   memberErrors.resourceId = "Выберите имя мастера/Соялярий";
      //   membersArrayErrors[memberIndex] = memberErrors;
      // }
    });

    if (membersArrayErrors.length) {
      errors.members = membersArrayErrors;
    }
  }
  return errors;
};

export default validate;
