var pg = require('pg');
var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE bulletins(id SERIAL PRIMARY KEY, title VARCHAR(40) not null, body VARCHAR(40) not null)');
query.on('end', function() { client.end(); });