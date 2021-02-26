const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


const toThousand = (n) => {
  return n.toLocaleString("es-AR", {
    minumunFractionDigits: 2,
    maximunFractionDigits: 2,
  });
};

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products");
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    const id = req.params.id;

    const product = products.find((prod) => {
      return prod.id == id;
    });

    res.render("detail", { product,
      toThousand,
     });
  },

  // Create - Form to create
  create: (req, res) => {
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const newProduct = {
      id: newId,
      name: req.body.name,
      price: Number(req.body.price),
      discount: Number(req.body.discount),
      category: req.body.category,
      description: req.body.description,
      image: req.file.filename,
    };
    products.push(newProduct);

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4));

    res.redirect("/");
  },

  // Update - Form to edit
  edit: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    const productId = req.params.id;
    const product = products.find((prod) => {
      return prod.id == prodId;
    });
    res.render("product-edit-form", { product });
  },
  // Update - Method to update
  update: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    const productId = req.params.id;
    const product = products.find((prod) => {
      return prod.id == prodId;
    });
    product.name = req.body.name;
    product.category = req.body.category;
    product.description = req.body.description;
    product.price = Number(req.body.price);
    product.discount = Number(req.body.discount);
    if(req.file) {
    product.image = req.file.filename;
    }
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    const productFilter = product.filter((prod) => {
      return prod.id != req.params.id;
    });

    fs.writeFileSync(productsFilePath, JSON.stringify(productFilter, null, 4));
    res.redirect("/");
  },
};

module.exports = controller;
