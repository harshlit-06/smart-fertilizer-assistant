const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const products = require('./products.json');

app.post('/api/suggestions', (req, res) => {
  const { tds, crop, lang } = req.body;
  let suggestions = [];

  if (tds && tds !== '') {
    const tdsVal = parseFloat(tds);
    if (tdsVal < 300) {
      suggestions = products.filter(p => p.suitability === 'low');
    } else if (tdsVal <= 800) {
      suggestions = products.filter(p => p.suitability === 'medium');
    } else {
      suggestions = products.filter(p => p.organicOnly);
    }
  } else if (crop && crop !== '') {
    suggestions = products.filter(p => p.crops.includes(crop.toLowerCase()));
  }

  res.json({ suggestions });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
