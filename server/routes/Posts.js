const express = require('express');
const router = express.Router();
const {Posts} = require('../models');

// end points 
// get all posts
router.get('/', async (req, res) => {
 const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});


// post a post

router.post('/', async (req, res) => {
const post = req.body;
await Posts.create(post);
res.json(post);
});





module.exports = router;