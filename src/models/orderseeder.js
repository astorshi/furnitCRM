const mongoose = require("mongoose");
const Orders = require("./orderModel");

mongoose
  .connect(
    "mongodb+srv://elbrus:1234@cluster0.favkl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    Orders.insertMany([
      {
        number: "STST",
        typeFurn: "TEST",
        priceFurn: "EEFVV",
        delivPrice: "RFR",
        deliveryDate: "RFR",
        constructPrice: "RFR",
        constructDate: "RFR",
        deliveryTeam: "TEST",
        constructTeam: "TEST",
        status: "TEST",
      },
      {
        number: "STST",
        typeFurn: "TEST",
        priceFurn: "RFR",
        delivPrice: "WF4343",
        deliveryDate: "WF4343",
        constructPrice: "WF4343",
        constructDate: "RFR",
        deliveryTeam: "TEST",
        constructTeam: "TEST",
        status: "TEST",
      },
      {
        number: "STST",
        typeFurn: "TEST",
        priceFurn: "RFR",
        delivPrice: "RFR",
        deliveryDate: "RFR",
        constructPrice: "RFR",
        constructDate: "RFR",
        deliveryTeam: "TEST",
        constructTeam: "TEST",
        status: "TEST",
      },
      {
        number: "STST",
        typeFurn: "TEST",
        priceFurn: "RFR",
        delivPrice: "RFR",
        deliveryDate: "RFR",
        constructPrice: "RFR",
        constructDate: "RFR",
        deliveryTeam: "TEST",
        constructTeam: "TEST",
        status: "TEST",
      },
      {
        number: "STST",
        typeFurn: "TEST",
        priceFurn: "RFR",
        delivPrice: "RFR",
        deliveryDate: "RFR",
        constructPrice: "RFR",
        constructDate: "RFR",
        deliveryTeam: "TEST",
        constructTeam: "TEST",
        status: "TEST",
      },
      {
        number: "STST",
        typeFurn: "TEST",
        priceFurn: "RFR",
        delivPrice: "RFR",
        deliveryDate: "RFR",
        constructPrice: "EEFVV",
        constructDate: "EEFVV",
        deliveryTeam: "TEST",
        constructTeam: "TEST",
        status: "TEST",
      },
    ]);
  });
