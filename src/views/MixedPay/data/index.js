import TextFieldInput from "../TextFieldInput/index";
import Certificate from "../Certificate/index";

const infoPay = {
  ["cash"]: "Наличка",
  ["card"]: "Безнал",
  ["mixed"]: "Смешанная оплата",
  ["certificate"]: "Сертификатом"
};

export default [
  {
    id: 1,
    value: "cash",
    label: "Наличными",
    component: TextFieldInput
  },
  {
    id: 2,
    value: "card",
    label: "Картой",
    component: TextFieldInput
  },
  {
    id: 3,
    value: "certificate",
    label: "Сертификатом",
    component: Certificate
  }
];
