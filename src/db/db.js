const mongoose = require("mongoose");

const { dbConnectionURL, options } = require("./config");

function connect() {
  console.log(dbConnectionURL);
  mongoose.connect(dbConnectionURL, options, (err) => {
    if (err) return console.log("Произошла ошибка ", err);
    console.log("Установлено успешное подключение к Базе Данных!");
  });
}
function disconnect() {
  mongoose.disconnect();
}
module.exports = { connect, disconnect };
