var express = require('express');
var router = express.Router();

var pg = require('pg');
var db = require('../controllers/models/database');
var queryClient = require('../controllers/models/clientDB');

var connectionString = db.connectionString;
/* GET home page. */

/*
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/

module.exports = {
  index: index
};

// second niveau de route

function index(req,res){
    res.json('ta gueuele');
}

router.get('/api/v1/todos', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, clientDB, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(connectionString);
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        var queryDB = clientDB.query(queryClient.selectAllClient());

        if (queryDB) {
            // Stream results back one row at a time
            queryDB.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            queryDB.on('end', function(result) {
                done();
                return res.json(results);
                //return res.render('client.ejs', {
                //  results: results,
                //  tests: tests
                //});
            });
        } else {
            return res.status(403).json({
                success: false,
                data: "Pas de requetes"
            });
        }

    });
});


router.get('/api/v1/todos/:clientID', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, clientDB, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(connectionString);
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        var queryDB = clientDB.query(queryClient.selectOneClientByName(req.params.clientID));

        if (queryDB) {
            // Stream results back one row at a time
            queryDB.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            queryDB.on('end', function(result) {
                done();
                return res.json(results);
                //return res.render('client.ejs', {
                //  results: results,
                //  tests: tests
                //});
            });
        } else {
            return res.status(403).json({
                success: false,
                data: "Pas de requetes"
            });
        }

    });
});


/*
router.get('/api/v1/todos/:clientID', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, clientDB, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(connectionString);
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        if (req.params.clientID & Number(req.params.clientID) != NaN) {
            var queryDB = clientDB.query(queryClient.selectOneClientById(req.params.clientID));
        } else {
            return res.status(403).json({
                success: false,
                data: queryClient.selectOneClientById(req.params.clientID),
            });
        }

        if (queryDB) {
            // Stream results back one row at a time
            queryDB.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            queryDB.on('end', function(result) {
                done();
                return res.json(results);
                //return res.render('client.ejs', {
                //  results: results,
                //  tests: tests
                //});
            });
        } else {
            return res.status(403).json({
                success: false,
                data: "Pas de requetes"
            });
        }

    });
});
*/

router.post('/api/v1/todos', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {
        text: req.body.text,
        complete: false
    };

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO fidel.items(text, complete) values($1, $2)", [data.text, data.complete]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM fidel.items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});


module.exports = router;
