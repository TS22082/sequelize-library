const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Book = require("../models/book");

// get all books from db
router.get("/", (req, res) => {
  Book.findAll({}).then(results => {
    res.send(results);
  });
});

// get all long books from db
router.get("/long", (req, res) => {
  Book.findAll({
    where: {
      pages: {
        [Op.gte]: 100
      }
    }
  }).then(results => {
    res.send(results);
  });
});

router.get("/short", (req, res) => {
  Book.findAll({
    where: {
      pages: {
        [Op.lt]: 100
      }
    }
  }).then(results => {
    res.send(results);
  });
});

router.post("/new", (req, res) => {
  Book.create({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    pages: req.body.pages
  }).then(() => {
    res.end();
  });
});

module.exports = router;
