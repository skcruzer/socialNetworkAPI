const { Thought, User } = require('../models')

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'user',
        strictPopulate: false,
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },

  // GET a thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'user',
        strictPopulate: false,
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },

  // CREATE a thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        )
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'We could not find a user with this username!' })
        }
        res.json(dbUserData)
      })
      .catch(err => res.json(err))
  },

  // ADD a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'We could not find a thought with this ID!' })
          return
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.json(err))
  },

  // DELETE a reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err))
  },

  // UPDATE a thought by ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id }, 
      body, 
      { new: true, runValidators: true }
    )
    .then(updatedThought => {
      if (!updatedThought) {
        return res.status(404).json({ message: 'We could not find a thought with this ID!' })
      }
      res.json(updatedThought)
    })
    .catch(err => res.json(err))
  },

  // DELETE a thought by ID
  deleteThought({ params, body}, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(deletedThought => {
      if (!deletedThought) {
        return res.status(404).json({ message: 'We could not find a thought with this ID!' })
      }
      res.json(deletedThought)
    })
    .catch(err => res.json(err))
  }
}

module.exports = thoughtController