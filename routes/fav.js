const express = require('express');
const router  = express.Router();
const { addFavs, getFavsByUserId } = require('../db/queries')


module.exports = (db) => {

  router.get('/:id', (req, res) => {
    userId = req.params.id;
    getFavsByUserId(userId)
      .then(data => {
        res.json(data);
      })
        .catch(err => {
          res
          .status(500)
          .json({ error: err.message });
        });
  });

  router.post('/:id', (req,res) => {
    const userId = req.session.userId;
    const mapId = req.params.id;

    addFavs(userId, mapId)
      .then(data => {
        res.status(200).send("okiiieee")
        // res.redirect(`/favs/${mapId}`);
      })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
  });








  return router;
};
