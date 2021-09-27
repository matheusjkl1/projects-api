/* eslint-disable no-console */
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const modelProject = require('./models/modelProjects');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.static(`${__dirname}/public`));

app.use('/uploads', express.static('uploads'));

app.set('views', path.join(__dirname, 'views'));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => { callback(null, 'uploads/'); },
  filename: (_req, _file, callback) => { callback(null, `${new Date().toISOString()}.jpeg`); },
});

const upload = multer({ storage });

app.get('/projects', async (_, res) => {
  const response = await modelProject.getAll();

  if (!response) return res.status(400).json({ message: 'Sem projetos' });

  return res.status(200).json(response);
});

app.post('/projects', upload.single('file'), async (req, res) => {
  const {
    file, body: {
      name, url, gitUrl, sinopse, stacks,
    },
  } = req;
  const response = await modelProject.create(name, file.path, url, gitUrl, sinopse, stacks);

  if (!response) return res.status(400).json({ message: 'Dados inválidos' });

  return res.status(201).json(response);
});

app.listen(PORT, () => (console.log(`Servidor Ligado na porta ${PORT} `)));
