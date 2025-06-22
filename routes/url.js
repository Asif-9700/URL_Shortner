// const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controllers/url');

// const express=require('express');
// const {handleGenerateNewShortURL,handleGetAnalytics} =require("../controllers/url");
// const router=express.Router();


// router.post("/", handleGenerateNewShortURL);


// //click counts routes
// router.get("/analytics/:shortId", handleGetAnalytics);

// module.exports=router;

const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

// click count route
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
