import moment from "moment";

const verifyNumber = value => {
  var numberRex = new RegExp("^[0-9]+$");
  if (numberRex.test(value)) {
    return true;
  }
  return false;
};

const verifyLetter = value => {
  var numberRex = new RegExp("^[a-zA-Zа-яА-ЯЁё ]+$");
  // console.log(numberRex.test(value), "test");
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
  // console.log(value);
  if (value.trim().length >= lth) {
    return true;
  }
  return false;
};


const validate = (values, ...rest) => {
  const errors = {};
  const { lastName, surname, phoneNumber, members } = values;
  // console.log(values);
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

  // if (!members) {
  //   errors.members = "Нет данных о записи";
  // }

  if (!members || !members.length) {
    errors.members = "Нет данных о записи";
  }

  if (members && members.length) {
    const membersArrayErrors = [];
    // console.log(members);

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
        memberErrors.start = "Запись ведется до 20:00";
        membersArrayErrors[memberIndex] = memberErrors;
      }

      if (member && member.end && moment(member.end).hour() >= 20 && moment(member.end).minute() >= 1) {
        memberErrors.end = "Запись ведется до 20:00";
        membersArrayErrors[memberIndex] = memberErrors;
      }

      if (member && member.start && member.end && !(moment(member.end).isAfter(member.start, "minute"))) {
        memberErrors.end = "Конечное время должно быть больше начального";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (!member || !member.resourceId) {
        memberErrors.resourceId = "Выберите имя мастера/Соялярий";
        membersArrayErrors[memberIndex] = memberErrors;
      }

      // if ( ) {
      //   // console.log(new Date(moment(member.date.format())));
      //   console.log(member.date.valueOf() instanceof Date);
      //   console.log(new Date(member.date.valueOf()) instanceof Date);
      //   const date = moment(member.date.format());
      //   console.log(date instanceof Date);
      // }

      // if (!member || !member.lastName) {
      //   memberErrors.lastName = "Required";
      //   membersArrayErrors[memberIndex] = memberErrors;
      // }
      // if (member && member.hobbies && member.hobbies.length) {
      //   const hobbyArrayErrors = [];
      //   member.hobbies.forEach((hobby, hobbyIndex) => {
      //     if (!hobby || !hobby.length) {
      //       hobbyArrayErrors[hobbyIndex] = "Required";
      //     }
      //   });
      //   if (hobbyArrayErrors.length) {
      //     memberErrors.hobbies = hobbyArrayErrors;
      //     membersArrayErrors[memberIndex] = memberErrors;
      //   }
      //   if (member.hobbies.length > 5) {
      //     if (!memberErrors.hobbies) {
      //       memberErrors.hobbies = [];
      //     }
      //     memberErrors.hobbies._error = "No more than five hobbies allowed";
      //     membersArrayErrors[memberIndex] = memberErrors;
      //   }
      // }
    });

    if (membersArrayErrors.length) {
      errors.members = membersArrayErrors;
    }
  }


  // console.log(members);

  // if (!members) {
  //   errors.members = "Нет данных о записи";
  // }


  // if (!members || !members.length) {
  //   errors.members = "Нет данных о записи";
  // }
  //
  // if (members) {
  //   members.forEach(item => {
  //     const { date, start, end, resourceId, title } = item;
  //     if (!title) {
  //       errors.title = "Заполните описание услуги";
  //     }
  //     if (title && !verifyLength(title, 3)) {
  //       errors.title = "Поле должно быть не меньше 3 символов";
  //     }
  //   });
  // }


  // else {
  //   const membersArrayErrors = [];
  //   values.members.forEach((member, memberIndex) => {
  //     const memberErrors = {};
  //     if (!member || !member.firstName) {
  //       memberErrors.firstName = "Required";
  //       membersArrayErrors[memberIndex] = memberErrors;
  //     }
  //     if (!member || !member.lastName) {
  //       memberErrors.lastName = "Required";
  //       membersArrayErrors[memberIndex] = memberErrors;
  //     }
  //     if (member && member.hobbies && member.hobbies.length) {
  //       const hobbyArrayErrors = [];
  //       member.hobbies.forEach((hobby, hobbyIndex) => {
  //         if (!hobby || !hobby.length) {
  //           hobbyArrayErrors[hobbyIndex] = "Required";
  //         }
  //       });
  //       if (hobbyArrayErrors.length) {
  //         memberErrors.hobbies = hobbyArrayErrors;
  //         membersArrayErrors[memberIndex] = memberErrors;
  //       }
  //       if (member.hobbies.length > 5) {
  //         if (!memberErrors.hobbies) {
  //           memberErrors.hobbies = [];
  //         }
  //         memberErrors.hobbies._error = "No more than five hobbies allowed";
  //         membersArrayErrors[memberIndex] = memberErrors;
  //       }
  //     }
  //   });
  //   if (membersArrayErrors.length) {
  //     errors.members = membersArrayErrors;
  //   }
  // }
  return errors;
};

export default validate;
