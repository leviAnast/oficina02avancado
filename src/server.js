const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const professoresRoutes = require('./routes/professoresRoutes');
const alunosRoutes = require('./routes/alunosRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', professoresRoutes);
app.use('/api', alunosRoutes);


app.listen(port, () => {
  console.log(` servidor aqui: http://localhost:${port}`);
});