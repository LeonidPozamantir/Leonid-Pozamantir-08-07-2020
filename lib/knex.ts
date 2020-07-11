import knex = require('knex');
import config = require('config');

module.exports = knex(config.get('database'));

