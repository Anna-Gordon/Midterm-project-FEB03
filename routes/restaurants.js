const express = require('express');
const router  = express.Router();
const { getUserById, getMapByType } = require('../db/queries');

module.exports = (db) => {

  router.get("/", (req, res) => {
    if(req.session.userId){
      user = req.session.userId;
      getUserById(user)
        .then(data => {
          user = data;
        })
    } else {
      user = null;
    }

    getMapByType('restaurant')
      .then(data => {
        const restoNames = data;
        res.render('restaurants', { restoNames, user });
      })
      .catch(err => {
        res.status(500)
        .json({ error: err.message });
      });
  });
  return router;
};

