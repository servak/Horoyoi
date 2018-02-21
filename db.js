const Promise = require('bluebird');
const path = require('path');
const sqlite = require('sqlite');
const migrationsPath = path.join(__dirname, 'migrations')
const databasePath = path.join(__dirname, 'db', 'database.sqlite')
const dbPromise = Promise.resolve()
  .then(() => sqlite.open(databasePath, { Promise }))
  .then(db => db.migrate({migrationsPath: migrationsPath}));
  // .then(db => db.migrate({ force: 'last' }));

module.exports = dbPromise;
