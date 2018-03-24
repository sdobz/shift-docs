"use strict";

const {it, describe} = require('mocha');
const assert = require('assert');
const Sequelize = require('sequelize');


describe('DB', function() {
  describe('connection', function() {
    it('should have env variables for the db', function() {
      assert(process.env.POSTGRES_USER);
      assert(process.env.POSTGRES_PASSWORD);
      assert(process.env.POSTGRES_DB);
      assert(process.env.POSTGRES_HOST);
    });
  
    const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST} = process.env;
  
    let sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
        host: POSTGRES_HOST,
        dialect: 'postgres',
        operatorsAliases: false,
    
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
      });
      
    sequelize
      .authenticate()
      .then(() => {
        describe("should be able to connect", function() {
          assert(true);
          console.log('Connection has been established successfully.');
        });
  
        describe("should be able to create a table", function() {
        
          let User = sequelize.define('user', {
            firstName: {
              type: Sequelize.STRING
            },
            lastName: {
              type: Sequelize.STRING
            }
          });
    
          describe("should be able to insert user data", function() {
            // force: true will drop the table if it already exists
            User.sync({force: true}).then(() => {
              // Table created
              
              let testUser = {
                firstName: 'John',
                lastName: 'Hancock 3'
              };
              
              return User.create(testUser).then(function() {
                console.log("User created");
                it("should succeed to create a user", function() {
                  assert(true, "User was created");
                });
              }).catch(err => {
                assert(false, "Error while creating user");
                console.error('Unable to insert data into the db:', err);
              }).finally(function() {
                sequelize.close();
                console.log("Sequelize should be closed");
              });
            });
          });
        });
      })
      .catch(err => {
        assert(false);
        console.error('Unable to connect to the database:', err);
      });
    
  });
  
});



