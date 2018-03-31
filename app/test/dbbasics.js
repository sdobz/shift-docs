"use strict";

const {it, describe} = require('mocha');
const assert = require('assert');
const dbconfig = require("../config/dbconfig");


describe('DB', function() {
  describe('connection', function () {
    it('should have env variables for the db', function () {
      assert(process.env.POSTGRES_USER);
      assert(process.env.POSTGRES_PASSWORD);
      assert(process.env.POSTGRES_DB);
      assert(process.env.POSTGRES_HOST);
    });
    
    it('should have env variables for the db', function () {
      assert(dbconfig.test.username);
      assert(dbconfig.test.password);
      assert(dbconfig.test.database);
      assert(dbconfig.test.host);
    });
    
  });
});



