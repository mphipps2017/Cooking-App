const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Get passportjs set up https://www.youtube.com/watch?v=sakQbeRjgwg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x
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
mongoose.connect('mongodb+srv://matthew123:gintama123@cookappcluster.1fmzw.mongodb.net/<dbname>?retryWrites=true&w=majority',() =>{
  console.log('Connected to mongoDB!');
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`))