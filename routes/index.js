const conn = require('./../inc/db');
const express = require('express');
const menus = require('./../inc/menus');
const router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  menus.getMenus().then(results => {
    res.render('index', {
      title: 'Restaurante Saboroso!',
      menus: results,
      isHome: true
    });
  });
});

router.get('/contacts', function (req, res, next) {
  res.render('contacts', {
    title: 'Contato - Restaurante Saboroso!',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga um oi!'
  });
});

router.get('/menus', function (req, res, next) {
  menus.getMenus().then(results => {
    res.render('menus', {
      title: 'Menu - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saborei nosso menu!',
      menus: results
    });
  });
});

router.get('/reservations', function (req, res, next) {
  res.render('reservations', {
    title: 'Reserva - Restaurante Saboroso!',
    background: 'images/img_bg_2.jpg',
    h1: 'Reserve uma mesa!'
  });
});

router.get('/services', function (req, res, next) {
  res.render('services', {
    title: 'Serviços - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'
  });
});

module.exports = router;
