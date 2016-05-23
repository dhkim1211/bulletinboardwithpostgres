var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/bulletin';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE bulletins(id SERIAL PRIMARY KEY, title VARCHAR(40) not null, body VARCHAR(40) not null)');
query.on('end', function() { client.end(); });