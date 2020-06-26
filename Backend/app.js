// Stopped at 15:51 in https://www.youtube.com/results?search_query=getting+started+with+express

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

app.get('/', (req, res) =>{
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/data', (req, res) => {
  res.json(['data']);
});

app.post('/api/data', (req, res) =>{
  const data ={
    text: req.body.text
  }
  if(!data.text){
    res.status(400).json({msg: "No text in data"});
  }
  res.json(data);
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`))