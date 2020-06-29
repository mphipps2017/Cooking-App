const express = require('express');

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

app.listen(PORT, () => console.log(`Server started on ${PORT}`))