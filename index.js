// const express=require("express");
// const {connectToMongoDB}=require("./connect");
// const app=express();
// const urlRoute=require("./routes/url");
// const URL=require('./models/url');
// const PORT=8001;

// connectToMongoDB('mongodb://localhost:27017/short-url').then(()=> 
//     console.log("mongodb connectd")
// );
// app.use(express.json());
// app.use("/url", urlRoute);


// app.get('/:shortId',async (req,res)=>{
//     const shortId=req.params.shortId;
//    const entry = await URL.findOneAndUpdate(
//     {
//         shortId
//     },
//     {
//         $push:{
//             visitHistory:{
//                 timestamp: Date.now(),
//             }
//         },
//     }
//    );
//    res.redirect(entry.redirectURL);
// });
// app.listen(PORT, ()=>{
//     console.log(`Server Started at PORT:${PORT}`)
// })


const express = require("express");
const path = require("path");
const cors = require("cors"); // optional, for frontend/backend on different ports
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => 
    console.log("MongoDB connected")
);

app.use(cors()); // optional
app.use(express.json());
app.use("/url", urlRoute);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Redirect short URL
app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        }
      }
    }
  );

  if (!entry) return res.status(404).send("Short URL not found");
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});
