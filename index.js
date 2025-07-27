// index.js
const express = require('express');
const app = express();
const port = 3000;

const tableRoutes = require('./routes/tableRoutes');

app.use(express.json());
app.use('/api/tables', tableRoutes);

app.listen(port, () => {
  console.log(`Table Lock API running at http://localhost:${port}`);
});
