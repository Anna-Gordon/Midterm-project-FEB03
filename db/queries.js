const { Pool } = require('pg');


const db = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const getMapNameById = (mapId) => {
  return db.query(`SELECT * FROM maps WHERE id=$1`, [mapId])
  .then(data => {
    return data.rows[0];
  })
  .catch(err => {
    console.log('Error: ', err);
  })
}

const mapsWithAssociatedPoints = (mapId) => {
  return db.query(`SELECT * FROM maps JOIN points ON maps.id=map_id WHERE maps.id=$1`, [mapId])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    console.log('Error: ', err);
  })
}

const getPointsByUserId = (userId) => {
  return db.query(`SELECT * FROM points JOIN users ON users.id = user_id WHERE user_id = $1`, [userId])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    console.log('Error: ', err);
  })
}

const getMapsByUserId = (userId) => {
  return db.query(`SELECT maps.name FROM maps JOIN users ON users.id = user_id WHERE user_id = $1`, [userId])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    console.log('Error: ', err);
  })
}

const addMyPoints = (point) => {
  return db.query(`INSERT INTO points (user_id, map_id, name, address, lat, lng, description)
                  VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *; `,
            [point.user_id, point.map_id, point.name, point.address, point.lat, point.lng, point.description])
  .then(res => {
    return res.rows;
  })
  .catch(err => {
    console.log('Error: ', err);
  })
}

const getUserByEmail = (email) => {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email])
  .then(data => {
    return data.rows[0];
  })
  .catch(err => {
    console.log('Error: ', err);
  })
}

const getUserById = (id) => {
  return db.query(`SELECT * FROM users WHERE id=$1`, [id])
  .then(data => {
    return data.rows[0];
  })
  .catch(err => {
    console.log('Error: ', err);
  })
}

const getMapByType = (type) => {
  return db.query(`SELECT * FROM maps WHERE type=$1;`, [type])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    console.log('Error: ', err);
  })
}


const deleteMyPoint = (pointId) => {
  return db.query(`DELETE FROM points WHERE id = $1;`, [pointId])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    console.log('Error: ', err);
  })
}

const getFavsByUserId = (userId) => {
  return db.query(`SELECT favs.id as favId, maps.name from favs JOIN maps ON maps.id = map_id WHERE favs.user_id = $1;
  `, [userId])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    console.log('Error: ', err);
  })
}


const addFavs = (userId, mapId) => {
  return db.query(`INSERT INTO favs (user_id,map_id) VALUES ($1, $2);
  `, [userId, mapId])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    console.log('Error: ', err);
  })
}

const deleteMyFav = (favId) => {
  return db.query(`DELETE FROM favs WHERE id = $1;`, [favId])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    console.log('Error: ', err);
  })
}

module.exports = { deleteMyFav, addFavs, getFavsByUserId, getMapsByUserId ,deleteMyPoint, addMyPoints, mapsWithAssociatedPoints, getUserByEmail, mapsWithAssociatedPoints, getPointsByUserId, getMapByType, getUserById, getMapNameById };
