const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

const sessionTracker = (req, res, next) => {
  if(req.session.userId === undefined && req.originalUrl !== '/users/login'){
    res.status(400).json({msg:'Not logged in, must sign in before you can use this function.'})
  } else {
    next();
  }
}

// Use middleware
app.use(session({ secret: 'funnyPicAtChristmasParty', resave:false, saveUninitialized: true }));
app.use(sessionTracker);
app.use(express.json());


// Routes
app.use(require('./routes/api'));

// Connect to DB
// TODO install on mac, https://apple.stackexchange.com/questions/362883/mongodb-doesnt-work-after-update-to-macos-catalina-10-15
mongoose.connect('mongodb+srv://matthew123:pass123@cookappcluster.1fmzw.mongodb.net/<dbname>?retryWrites=true&w=majority',() =>{
  console.log('Connected to mongoDB!');
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`))