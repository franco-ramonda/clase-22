// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const mainController = require("../controllers/mainController");
const adminMiddleware = require("../middlewares/adminMiddleware");


router.get("/", mainController.index);
router.get("/search", mainController.search);
router.get("/admin", adminMiddleware ,mainController.admin);

module.exports = router;

