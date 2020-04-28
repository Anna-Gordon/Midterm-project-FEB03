const express = require('express');
const router  = express.Router();
const { getMapByType, getUserById } = require('../db/queries');



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

      getMapByType('park')
      .then(data => {
        const parkNames = data;
        res.render('parks', { parkNames, user });
      })
      .catch(err => {
        res.status(500)
        .json({ error: err.message });
      });
  });
  return router;
};

