require("dotenv").config();
require('express-async-errors');

const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors');
const path = require('path');
const app = express();
const mainRouter = require("./routes/user");

app.use(express.json());

app.use(cors());
app.use("/api/v1", mainRouter);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'client/dist')));

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

const port = process.env.PORT || 3000;

const start = async () => {

    try {        
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();

