//Nomear como uma class, primeira letra maiúscula e no singular

const Sequelize = require('sequelize');
const db = require('../db/connection');

//criando um model
const Job = db.define('job', {
   title: {
      type: Sequelize.STRING,
   },
   description: {
      type: Sequelize.STRING,
   },
   salary: {
      type: Sequelize.STRING,
   },
   company: {
      type: Sequelize.STRING,
   },
   email: {
      type: Sequelize.STRING,
   },
   new_job: {
      type: Sequelize.INTEGER,
   }
}, {
   timestamps: false
});

module.exports = Job;