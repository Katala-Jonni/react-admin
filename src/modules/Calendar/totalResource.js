import moment from "moment/min/moment-with-locales";

export default {
  [moment()
    .set("date", 13)
    .format("DD.MM.YY")]: [
    {
      resourceId: "Солярий",
      resourceTitle: "Солярий"
    },
    {
      resourceId: "Александра",
      resourceTitle: "Александра"
    },
    {
      resourceId: "Мария",
      resourceTitle: "Мария"
    }
  ],
  [moment()
    .set("date", 15)
    .format("DD.MM.YY")]: [
    {
      resourceId: "Солярий",
      resourceTitle: "Солярий"
    },
    {
      resourceId: "Жанна",
      resourceTitle: "Жанна"
    },
    {
      resourceId: "Анна",
      resourceTitle: "Анна"
    }
  ],
  [moment()
    .set("date", 3)
    .format("DD.MM.YY")]: [
    {
      resourceId: "Солярий",
      resourceTitle: "Солярий"
    },
    {
      // можно имя в качестве id
      resourceId: "Анна",
      resourceTitle: "Анна"
    },
    {
      resourceId: "Наталья",
      resourceTitle: "Наталья"
    }
  ],
  [moment()
    .set("date", 4)
    .format("DD.MM.YY")]: [
    {
      resourceId: "Солярий",
      resourceTitle: "Солярий"
    },
    {
      resourceId: "Надежда",
      resourceTitle: "Надежда"
    },
    {
      resourceId: "Жанна",
      resourceTitle: "Жанна"
    }
  ],
  [moment()
    .set("date", 7)
    .format("DD.MM.YY")]: [
    {
      resourceId: "Солярий",
      resourceTitle: "Солярий"
    },
    {
      resourceId: "Надежда",
      resourceTitle: "Надежда"
    },
    {
      resourceId: "Жанна",
      resourceTitle: "Жанна"
    },
    {
      // можно имя в качестве id
      resourceId: "Анна",
      resourceTitle: "Анна"
    },
    {
      resourceId: "Наталья",
      resourceTitle: "Наталья"
    }
  ],
  [moment()
    .set("date", 2)
    .format("DD.MM.YY")]: [
    {
      resourceId: "Солярий",
      resourceTitle: "Солярий"
    },
    {
      resourceId: "Надежда",
      resourceTitle: "Надежда"
    },
    {
      resourceId: "Жанна",
      resourceTitle: "Жанна"
    },
    {
      resourceId: "Наталья",
      resourceTitle: "Наталья"
    },
    {
      resourceId: "Ирина",
      resourceTitle: "Ирина"
    }
  ]
};
