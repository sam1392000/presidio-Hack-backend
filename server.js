const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config(); 
const mongoose = require('mongoose');

const postRoutes = require("./routes/posts.routes")
const userRoutes = require('./routes/user.routes')

// db Connection
const db = process.env.DB;
mongoose.connect(db,{
    useNewUrlParser: true,
   
    useUnifiedTopology: true
}).then(() => {
    console.log("Databases Connected");
}).catch((e) => {
    console.log(e);
    console.log("error in connection");
})


app.use(cors())
app.use(express.json())
app.use("/api",postRoutes)
app.use("/api",userRoutes)

const PORT  = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server start running at the port ${PORT}`)
})