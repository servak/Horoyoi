const Promise = require('bluebird');
const path = require('path');
const sqlite = require('sqlite');
const migrationsPath = path.join(__dirname, 'migrations')
const dbPromise = Promise.resolve()
  .then(() => sqlite.open('./database.sqlite', { Promise }))
  .then(db => db.migrate({migrationsPath: migrationsPath}));
  // .then(db => db.migrate({ force: 'last' }));

module.exports = dbPromise;
