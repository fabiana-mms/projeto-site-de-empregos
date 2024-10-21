const Sequelize = require('sequelize'); //requisitando o sequelize

//criando a conexão com o banco de dados
const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: './db/app.db'
});

module.exports = sequelize;