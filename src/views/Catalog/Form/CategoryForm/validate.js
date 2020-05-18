import moment from "moment";

const validate = values => {
  const errors = {};
  const { value, name, color } = values;

  if (!value) {
    errors.value = "Пустое поле!";
  }

  if (!name) {
    errors.name = "Пустое поле!";
  }

  if (!color) {
    errors.color = "Пустое поле!";
  }

  return errors;
};

export default validate;
