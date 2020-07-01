const express = require('express');
const mongoose = require('mongoose');

const app = express();``
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
app.use('/api/recipes', require('./routes/api/recipes'));

// Connect to DB
// TODO install on mac, https://apple.stackexchange.com/questions/362883/mongodb-doesnt-work-after-update-to-macos-catalina-10-15
mongoose.connect('mongodb://localhost:27017', () =>{
  console.log('Connected to mongoDB!');
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`))