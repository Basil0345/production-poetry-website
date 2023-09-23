const express = require("express");
const router = express.Router();
const Poem = require("../models/Poem");


//Route 1: Fetch All Poems
router.get("/getallposts", async (req, res) => {
    try {
        let posts = await Poem.find({}).select('-content');
        res.json(posts)
    } catch (error) {
        console.log("something went wrong");
        res.status(400).json({ error: "something went wrong" })
    }
})

//Route 2: Fetch Poem by name
router.get("/fetchpoem/:slug", async (req, res) => {
    try {
        let { slug } = req.params;
        let post = await Poem.findOne({ slug: slug }).select("content").select("title");
        res.json(post);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
})

//Route 3: Fetch Latest post
router.get("/fetchlastestpost", async (req, res) => {
    try {
        let post = await Poem.findOne({}).sort({ _id: -1 }).select("image").select("slug");
        res.json(post);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
})

//Route 4: - pagination
router.get("/getPosts/:page", async (req, res) => {
    try {
        let totalResults = await Poem.estimatedDocumentCount();
        let { page } = req.params;
        page = parseInt(page);
        let posts = await Poem.find({}).skip(3 * (page - 1)).select('-content').limit(3);
        res.json({ totalResults, posts })
    } catch (error) {
        console.log("something went wrong");
        res.status(400).json({ error: "something went wrong" });

    }
})

module.exports = router;