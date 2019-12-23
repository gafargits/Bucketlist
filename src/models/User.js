const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
}, {
  timestamps: true
})

module.exports = User = mongoose.model('users', UserSchema);