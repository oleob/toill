// Include this file to use DB connectivity, queries can be executed on the 'pool' object

var pg = require('pg');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
      user: 'foo', //env var: PGUSER
      database: 'my_db', //env var: PGDATABASE
      password: 'secret', //env var: PGPASSWORD
      host: 'localhost', // Server hosting the postgres database
      port: 5432, //env var: PGPORT
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};


//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool = new pg.Pool(config);
module.exports = {
	pool: pool
};

process.on('unhandledRejection', function(e) {
	  console.log(e.message, e.stack)
})

// This is an example of a query that is executed and the resulting message will be logged to the console
pool.query("SELECT * FROM test ORDER BY id DESC LIMIT 1", function(err, result) { console.log(result.rows[0].message); });
