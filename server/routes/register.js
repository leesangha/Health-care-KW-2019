const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.post("/", (req, res) => {
    const list = req.body.source;
    const user_no = req.body.user_no;
    list.forEach(elem => {
    console.log('각각의 재료 : ' + elem);  
    db.query(`remove_hate_ingredient '${user_no}' , '${elem}' `)
    });
    res.send({success: 'success', user_no:user_no});
  
});

module.exports = router;