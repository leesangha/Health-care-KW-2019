const express = require("express");
const db = require("../dbconnection");
const { predictPreference } = require("../predictPreference");

const router = express.Router();

router.post("/nutrition", (req, res) => {
  db.query(`read_user_nutirtion'${req.body.userNumber}'`,
    (err, rows) => {
    if (err) console.log("error");
    else {
      res.send(rows.recordsets[0][0]);
    }
  });
});

router.post("/intake", (req, res) => {
  // 1을 유저 번호로 수젛애햐합니다.
  db.query(`read_user_today_nutrition'${req.body.userNumber}'`,
    (err, rows) => {
    if (err) console.log("error");
    else {
      res.send(rows.recordsets[0][0]);
    }
  });
});

router.post("/preference", (req, res) => {
  const userNumber = req.body.userNumber;
  db.query("select * from user_preference", async (err, rows) => {
    const usersPreferences = rows.recordset;

    if (usersPreferences === undefined || err) res.send({ err: "error" });
    else {
      let preference = usersPreferences.map((object) => {
        const values = Object.values(object);
        return values.slice(1, values.length);
      });

      // 선호도 모델 계산되고 정렬되어 반환됨.
      preference = await predictPreference(preference, userNumber);
      res.send({ pref: preference });
    }
  });
});

module.exports = router;
