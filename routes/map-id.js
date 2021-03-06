const express = require('express');
const router  = express.Router();
const { getUserById, mapsWithAssociatedPoints, getMapNameById } = require('../db/queries');



module.exports = (db) => {

  router.get("/:id", (req, res) => {
    if(req.session.userId){
      user = req.session.userId;
      getUserById(user)
      .then(data => {
        user = data;
      })
    } else {
      user = null;
    }

    getMapNameById(req.params.id)
      .then(data => {
        mapName = data.name;
      })

    mapsWithAssociatedPoints(req.params.id)
      .then(map => {
        const mapId = req.params.id;
        res.render('create-maps', { mapName, map, user, mapId });
      })
      .catch(err => {
        res.
        status(500)
        .json({ error: err.message });
      });
  });
  return router;
};

