const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction')
const moment = require('moment')

const thoughtSchema = new Schema (
  {
    thoughtInput: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true,
      ref: 'User'
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
)

// use schema to create Thought model
const Thought = model('Thought', thoughtSchema)

// get total count of friends
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length
})

module.exports = Thought