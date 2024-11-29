const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcryptjs');
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
    const { userName, password } = req.body;
    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        await Users.create({
            userName: userName,
            password: hash
        });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// login route
router.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await Users.findOne({ where: { userName: userName } });
        if (!user) {
            return res.status(404).json({ error: "User doesn't exist" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Wrong username and password combination" });
        }
        const accessToken = sign({ userName: user.userName, id: user.id }, "importantsecret");
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/auth", validateToken, (req, res) => {
    res.status(200).json(req.user);
});

module.exports = router;