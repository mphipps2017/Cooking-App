const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const logger = (req, res, next) => {
  console.log(`${req.originalUrl}`);
  next();
}

// Use middleware
app.use(logger);
app.use(express.json());


// Routes
app.use(require('./routes/api'));

// Connect to DB
// TODO install on mac, https://apple.stackexchange.com/questions/362883/mongodb-doesnt-work-after-update-to-macos-catalina-10-15
mongoose.connect('mongodb+srv://matthew123:pass123@cookappcluster.1fmzw.mongodb.net/<dbname>?retryWrites=true&w=majority',() =>{
  console.log('Connected to mongoDB!');
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`))