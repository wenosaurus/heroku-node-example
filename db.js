const pg = require('pg');
const pokemon = require('./models/pokemon');
const user = require('./models/user');
const url = require('url');

if (process.env.DATABASE_URL) {

    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    var configs = {
        user: 'akira',
        host: '127.0.0.1',
        database: 'pokemons',
        port: 5432
    };

} else {
    const pool = new pg.Pool(configs);

    pool.on('error', function(err) {
        console.log('idle client error', err.message, err.stack);
    });

    module.exports = {
        /*
         * ADD APP MODELS HERE
         */
        pokemon: pokemon(pool),
        user: user(pool),


        //make queries directly from here
        queryInterface: (text, params, callback) => {
            return pool.query(text, params, callback);
        },

        // get a reference to end the connection pool at server end
        pool: pool
    };
};