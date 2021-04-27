// // configuration to mongo
// ​
// const seedData = require('./models/logs.js');
// const mongoURI = 'mongodb://localhost:27017/' + 'logs';
// const db = mongoose.connection;


// // Connect to Mongo
// mongoose.connect(mongoURI);
// //Creater Your Log in MongoDB

// // connection error or success
// db.on('error', (err) => console.log(err.message + 'is Mongod not running?'));
// db.on('connected', () => console.log('mongo connected: ', mongoURI));
// db.on('disconnected', () => console.log('mongo disconnected'));
// ​
// db.on('open', () => {
//     console.log('connection made!');
// });

