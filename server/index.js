
//initialize server and make api calls to the server
const PORT = process.env.PORT || 3001;
const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

// import the database table

const db = require("./models");

// import the routes
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

// comment router
const commentsRouter = require('./routes/Comments');
app.use('/comments', commentsRouter);

// user router
const usersRouter = require('./routes/Users');
app.use('/auth', usersRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

