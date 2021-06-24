require('dotenv').config()
//const {DB_HOST, DB_NAME, DB_PORT, dbConnectionURL} = process.env

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};




// const DB_HOST = "localhost";
// const DB_NAME = "AVITO";
// const DB_PORT = 27017;
// const dbConnectionURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// eslint-disable-next-line quotes
//const dbConnectionURL = "mongodb+srv://admin:1234@cluster0.fex4j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports = { options };

