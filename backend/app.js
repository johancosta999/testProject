//VQXl9MkCtgnyxDzg

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/userRoute");

const app = express();
const cors = require("cors");
//middlewire 
app.use(express.json());
app.use(cors());
app.use("/users", router);


mongoose.connect("mongodb+srv://admin:VQXl9MkCtgnyxDzg@merncluster.8dgv3ew.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})
.catch((err) => console.log((err)));