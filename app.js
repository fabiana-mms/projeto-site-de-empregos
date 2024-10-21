const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const { title } = require('process');
const { request } = require('http');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const PORT = 3000;

//listen PORT 3000
app.listen(PORT, function () {
   console.log(`O Express está rodando na porta ${PORT}`);
});

//usando o body parser que permitirá pegar dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: false }));

//handle bars 
app.engine('handlebars', engine({ defaultLayout: 'main' })); //qual nosso arquivo principal de layout
app.set('view engine', 'handlebars'); //qual o framework ou biblioteca que irá renderizar as views
app.set('views', path.join(__dirname, 'views')); //qual será o diretório nas nossas views, dos templates do projeto

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//db connection
db
   .authenticate()
   .then(() => {
      console.log("Conectou ao banco de dados com sucesso");
   })
   .catch(err => {
      console.log("Ocorreu um erro ao conectar", err);
   });

//routes
app.get('/', (req, res) => {

   let search = req.query.job || '';
   let query = '%' + search + '%'; //PH -> PHP, Word -> Wordpress, press -> Wordpress

   if (!search) {
      Job.findAll({
         order: [
            ['createdAt', 'DESC']
         ]
      })
         .then(jobs => {
            res.render('index', {
               jobs
            });
         })
         .catch(err => {
            console.log(err);
            res.status(500).send('Erro ao carregar os dados');
         });
   } else {
      Job.findAll({
         where: { title: { [Op.like]: query } },
         order: [
            ['createdAt', 'DESC']
         ]
      })
         .then(jobs => {

            res.render('index', {
               jobs, search
            });
         })
         .catch(err => {
            console.log(err);
            res.status(500).send('Erro ao carregar os dados');
         });
   }
});

//jobs routes. Conseguimos chamar as rotas no app vindas do jobs.js
app.use('/jobs', require('./routes/jobs'));