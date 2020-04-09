const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.post("/", (req, res) => {
  const ingredient = req.body.search;
  console.log('검색 재료 ' + ingredient);
  db.query(`select * from food_ingredient where ingredient like '%${ingredient}%'`,
    (err, rows) => {
    res.send(rows.recordset);
    }
  );
});

module.exports = router;
