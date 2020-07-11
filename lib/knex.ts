import Knex from 'knex';
import config = require('config');
export default Knex(config.get('database') as Knex.Config);

