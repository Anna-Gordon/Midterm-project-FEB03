const express = require('express');
const router  = express.Router();
const { deleteMyPoint, addMyPoints } = require('../db/queries')

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM points;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
          res.
          status(500)
          .json({ error: err.message });
      });
  });

  router.delete("/:point_id", (req,res) => {
    const pointId = req.params.point_id

    deleteMyPoint(pointId)
      .then(data => {
        res.status(200).end()
      })
      .catch(err => {
        res.
        status(500)
        .json({ error: err.message });
      });
  })


  router.post("/", (req, res) => {
    console.log("req body", req.body);

    const userId = 4;
    const mapId = req.body.mapId;
    const address = req.body.address;
    const name = req.body.name;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const desc = req.body.content;

    let object = {
      user_id: userId,
      map_id: mapId,
      name: name,
      address: address,
      lat: lat,
      lng: lng,
      description: desc
    };
    // 7 keyvalue pairs
    addMyPoints(object)
      .then(data => {
        res.redirect(`/map/${mapId}`)
      })
      .catch(err => {
        res.
        status(500)
        .json({ error: err.message });
      });

  });

  return router;
};
