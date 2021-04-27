const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logsSchema = new Schema({
  // add your code here to set up your schema
  title: String,
  entry: String,
  shipisBroken: {type: Boolean, default: true}
},{timestamps: true});

const captLogs = mongoose.model('captLogs', logsSchema);

//make this exportable to be accessed in `app.js`
module.exports = captLogs;