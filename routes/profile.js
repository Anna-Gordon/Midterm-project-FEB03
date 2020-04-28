const express = require('express');
const router  = express.Router();
const { getFavsByUserId, getUserById, getMapsByUserId } = require('../db/queries')


module.exports = (db) => {

  router.get("/", (req, res) => {
    let userId = 0;
    let user = {};
    if(req.session.userId){
      userId = req.session.userId;
      getUserById(userId)
      .then(data => {
        user = data;
      })
    } else {
      user = null;
    }

    getMapsByUserId(userId)
      .then(data => {
        const listName = data
        console.log("user?",userId);

        getFavsByUserId(userId)
          .then(favData => {
            console.log("profile route", favData)
            res.render('profile', {listName, user, favData})
          })

      })
      .catch(err => {
        res.
        status(500)
        .json({ error: err.message });
      });
  });
  return router;
};
