// use strict
'use strict';
// require fs
var fs = require('fs');
// require path 
var path = require('path');
// require express
var express = require('express');
// require bodyparser
var bodyParser = require('body-parser');
// define app as an instance of express
var app = express();

// set the file path of the contacts json
var CONTACTS_FILE = path.join(__dirname, 'contacts.json');

// set the port 
app.set('port', (process.env.PORT || 3000));

// set the path 
app.use('/', express.static(path.join(__dirname, 'public')));
// use the body parser for json 
app.use(bodyParser.json());
// encode the url 
app.use(bodyParser.urlencoded({extended: true}));

// get the /save-contact for the json file 
app.get('/save-contact', function(req, res) {
  // read the contacts file 
  fs.readFile(CONTACTS_FILE, function(err, data) {
    // if there is an error
    if (err) {
      // output the error to the console 
      console.error(err);
      // exit the process 
      process.exit(1);
    }
    // set the header so there is no cache 
    res.setHeader('Cache-Control', 'no-cache');
    // parse the json 
    res.json(JSON.parse(data));
  });
});

// go to /save-contact to write to the file 
app.post('/save-contact', function(req, res) {
  // read the contacts file 
  fs.readFile(CONTACTS_FILE, function(err, data) {
    // if there is an error
    if (err) {
      // log the error to the console 
      console.error(err);
      // exit the process
      process.exit(1);
    }
    // set contacts equal to the parsed json 
    var contacts = JSON.parse(data);
    
    // define a new contact 
    var newContact = {
      // set id to current time 
      id: Date.now(),
      // define client name 
      clientname: req.body.clientname,
      // define client email
      clientemail: req.body.clientemail, 
      // define client phone
      clientphone: req.body.clientphone, 
      // define desired service
      desiredservice: req.body.desiredservice, 
      // define desired date
      desireddate: req.body.desireddate, 
      // define desired time
      desiredtime: req.body.desiredtime, 
      // define desired employee
      desiredemployee: req.body.desiredemployee, 
      // define client comments
      clientcomments: req.body.clientcomments,
      // define marketing from 
      marketingfrom: req.body.marketingfrom,
      // define newsletter via text
      newslettertext: req.body.newslettertext,
      // define newsletter via email 
      newsletteremail: req.body.newsletteremail
    };
    // push the new contact to contacts 
    contacts.push(newContact);
    // write to the contact file as a string 
    fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 4), function(err) {
      // if there is an error
      if (err) {
        // write the error to the console 
        console.error(err);
        // exit the process
        process.exit(1);
      }
      // set header to no cache
      res.setHeader('Cache-Control', 'no-cache');
      // json contacts 
      res.json(contacts);
    });
  });
});

// listen for the port to start 
app.listen(app.get('port'), function () {
  // log that the server has started at the correct port 
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});