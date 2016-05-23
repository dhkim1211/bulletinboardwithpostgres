var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// POST new messages
router.post('/messages', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {title: req.body.title, body: req.body.body};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO bulletins(title, body) values($1, $2)", [data.title, data.body]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM bulletins ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.redirect('messages');
        });


    });
});

//GET messages
router.get('/messages', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM bulletins ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.render('messages', {posts: results});
        });

    });

});

module.exports = router;
