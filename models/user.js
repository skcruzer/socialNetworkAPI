const { Schema, model } = require('mongoose')
const moment = require('moment')

const userSchema = new Schema (
  {
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address must be valid!']
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
})

// use schema to create User model
const User = model('User', userSchema)

// get total count of comments and replies
userSchema.virtual('friendsCount').get(function() {
  return this.friends.length
})

// export User model
module.exports = User