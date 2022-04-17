const { User } = require('../models')

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },

  // GET user with thoughts by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },

  // CREATE a user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err))
  },

  // ADD friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'We could not find a user with this ID!' })
          return
        }
        res.json(dbUserData)
      })
      .catch(err => res.json(err))
  },

  // UPDATE a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'We could not find a user with this ID!' })
          return
        }
        res.json(dbUserData)
      })
      .catch(err => res.json(err))
  },

  // DELETE a user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'We could not find a user with this ID!' })
          return
        }
        res.json(dbUserData)
      })
      .catch(err => res.status(400).json(err))
  },

  // REMOVE a friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err))
  }
}

module.exports = userController