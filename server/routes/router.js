const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.get("/api/isLogin", (req, res) => {
  const userId = req.query.id;
  const userPw = req.query.pw;

    db.query("select count(*) as cnt from getuser where id='"+userId+"' and pw='"+userPw+"'",
      (err, rows, fields) => {
        console.log(rows[0].cnt);
        res.send({ rs: rows[0].cnt });
      }
    );
});

router.get("/getData", (req, res) => {
  db.query("select * from Member where name = 'sangha'", (err, rows) => {
    if (!err) {
      console.log(rows.recordset);
      res.send(rows.recordset);
    } else {
      console.log("query : error : " + err);
      res.send(err);
    }
  });
});

module.exports = router;
