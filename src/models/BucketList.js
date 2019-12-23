const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BucketListSchema = new Schema({
  // id: {
  //   type: Number,
  //   required: true,
  //   validate(value){
  //     if(value <= 0){
  //       throw new Error('id must be a positive number')
  //     }
  //   }
  // },
  name: {
    type: String,
    required: true,
    trim: true
  },
  items: [
    {
    //   type: Schema.Types.ObjectId,
    //   ref: "items"
    // }
    // {
    //   type: Schema.Types.ObjectId,
    //   ref: 'items'
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true
      },
      date_created: {
        type: Date,
        default: Date.now
      },
      date_modified: {
        type: Date,
        default: Date.now
      },
      done: {
        type: Boolean,
        default: false
      }
    }
  ],
  // date_created:{
  //   type: Date,
  //   default: Date.now
  // },
  // date_modified: {
  //   type: Date,
  //   default: Date.now
  // },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
}, {
  timestamps: true
})

module.exports = BucketList = mongoose.model('bucketlist', BucketListSchema);