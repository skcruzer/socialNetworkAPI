const router = require('express').Router()

const { getAllUsers, getUserById, createUser, addFriend, updateUser, deleteUser, removeFriend } = require('../../controllers/userController')

// route to get all users and create a user
router.route('/').get(getAllUsers).post(createUser)

// route to get user by ID, update & delete a user
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)

// route to add and remove a friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router