const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.post("/", (req, res) => {
    const list = req.body.source;

    list.forEach(elem => {
     db.query(``,(err,rows) =>{
         
     })   
    });
  
});

module.exports = router;