const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const  bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
    const { userName, password } = req.body;
    if (!password) {
      return res.json("Password is required");
    }
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            userName: userName,
            password: hash
        });
        res.json("Success");
    }).catch((error) => {
        console.log(error);
        res.json("Error");
    });
  });
//login route

router.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    const user = await Users.findOne({ where: { userName: userName } });
    if (!user) {
        return res.json({ error: "User Doesn't Exist" }); // Use return to exit the function
    }
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
            return res.json({ error: "Wrong Username and Password Combination" }); // Use return to exit the function
        }
        res.json("You logged in!");
    });
});


module.exports = router;