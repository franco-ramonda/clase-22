const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");


const toThousand = (n) => {
  return n.toLocaleString("es-AR", {
    minumunFractionDigits: 2,
    maximunFractionDigits: 2,
  });
};

const controller = {
  index: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    res.render("index", {
      products,
      toThousand,
    });
  },
  search: (req, res) => {
    res.render("results");
  },

  admin: (req, res) => {
    res.send('Hola Admin')
  }
};


module.exports = controller;

