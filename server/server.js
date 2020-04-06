const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
const data = require('./data/data');
const data_probable = require('./data/data_probable');

app.use(cors());
app.use(express.json());

app.get('/api/data', async (req, res) => {
  try {
    const totalData = [...data, ...data_probable];
    res.json(totalData);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
