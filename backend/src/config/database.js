require("dotenv").config();

module.exports = {
  development: {
    username: "bjjuser",
    password: "bjjfeedback",
    database: "bjjfeedback",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
  },
};
