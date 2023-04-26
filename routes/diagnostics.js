const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const { isValid , errors } = req.body;

  if (isValid && errors) {
    const payLoad = {
      time: Date.now(),
      error_id: uuidv4(),
      errors,
    }

    if(!isValid) {
      readAndAppend(payLoad, './db/diagnostics.json');
      res.json(`Diagnostic Info added`);
    } else {
      res.json({ 
        message: 'Error in posting tip',
        error_id: payLoad.error_id,
      });
    }
  }
});

module.exports = diagnostics;
