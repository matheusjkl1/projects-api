const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const modelProject = require('./models/modelProjects');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => { callback(null, 'uploads/'); },
  filename: (req, _file, callback) => { callback(null, `${req.body.name}.jpeg`); },
});

const upload = multer({ storage });

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.static(`${__dirname}/public`));

app.set('views', path.join(__dirname, 'views'));

app.get('/projects', async (_, res) => {
  const getProjetcts = await modelProject.getAll();

  if (!getProjetcts) return res.status(400).json('Error');

  return res.status(200).json(getProjetcts);
});

app.post('/projects', upload.single('file'), async (req, res) => {
  const { file, body: { name, gitUrl, sinopse } } = req;
  const response = await modelProject.create(name, file, gitUrl, sinopse);

  if (!response) return res.status(400).json({ message: 'Dados inválidos' });

  return res.status(201).json(response);
});

app.post('/images', upload.single('file'), async (req, res) => {
  const { file } = req;
  const response = await modelProject.uploadImage(file);

  if (!response) return res.status(400).json({ message: 'Dados inválidos' });

  return res.status(201).json(response);
});

app.get('/projects', async (_, res) => {
  const response = await modelProject.getAll();

  if (!response) return res.status(400).json({ message: 'Nao a projetos' });

  return res.status(200).json(response);
});

app.listen(PORT, () => (`Servidor Ligado na porta ${PORT}`));
