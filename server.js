const path = require('path');
const cors = require('cors');
const express = require('express');

const app = express();

const http = require('http').createServer(app);

app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (_, res) => {
  res.render('index');
});

http.listen(PORT, () => (`Servidor Ligado na porta ${PORT}`));
