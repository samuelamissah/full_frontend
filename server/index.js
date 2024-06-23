
//initialize server and make api calls to the server

const express = require('express');

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// import the database table

const db = require("./models");

// import the routes
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
});


