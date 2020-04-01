const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.post("/", (req, res) => {
  const user_id = req.body.user_id;
  const food_no = req.body.food_id;
  console.log(user_id + " " + food_no);
  db.query(
    "change_user_preference '" + user_id + "','" + food_no + "' , '" + 0 + "'",
    (err, rows) => {
      if (err) console.log("error");
      else {
        //console.log('success for hate');
        res.send(rows.recordsets);
      }
    }
  );
});

module.exports = router;
