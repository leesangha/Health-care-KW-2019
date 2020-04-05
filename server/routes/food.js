const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.post("/dislike", (req, res) => {
  const userNumber = req.body.userNumber;
  const foodNumber = req.body.foodNumber;

  db.query(
    `change_user_preference '${userNumber}','${foodNumber}','0'`,
    (err, rows) => {
      if (err) console.error("선호도 내림에서 오류가 발생했습니다.");
      else {
        //console.log('success for hate');
        res.send(rows.recordsets);
      }
    }
  );
});

router.post('/like', (req, res) => {
  const userNumber = req.body.userNumber;
  const foodNumber = req.body.foodNumber;

  db.query(
    `change_user_preference '${userNumber}','${foodNumber}','0'`,
    (err, rows) => {
      if (err) console.error("선호도 올림에서 오류가 발생했습니다.");
      else {
        res.send(rows.recordsets);
      }
    }
  );
});

module.exports = router;
