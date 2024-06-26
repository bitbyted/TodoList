const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {type: String, unique: true},
  password: String,
});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
