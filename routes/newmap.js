const express = require('express');
const router  = express.Router();
const { getUserById, mapsWithAssociatedPoints } = require('../db/queries');

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

    mapsWithAssociatedPoints(req.params.id)
      .then(map => {
        const mapId = req.params.id;
        res.render('newmap.ejs', { map, user, mapId });
      })
      .catch(err => {
        res.
        status(500)
        .json({ error: err.message });
      });
  });
  return router;
};

