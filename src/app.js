const express = require('express');
const { db, initializeDatabase } = require('./database');
const routes = require('./routes');

const app = express();
initializeDatabase();

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
