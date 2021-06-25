const mongoose = require("mongoose");

const { options } = require("./config");
const { DB_CONNECTION_URL } = process.env;

function connect() {
  console.log("===URL===>>>", DB_CONNECTION_URL);
  mongoose.connect(DB_CONNECTION_URL, options, (err) => {
    if (err) return console.log("Произошла ошибка ", err);
    console.log("Установлено успешное подключение к Базе Данных!");
  });
}
function disconnect() {
  mongoose.disconnect();
}
module.exports = { connect, disconnect };
