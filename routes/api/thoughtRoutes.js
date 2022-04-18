const router = require('express').Router()

const { getAllThoughts, getThoughtById, createThought, addReaction, removeReaction, updateThought, deleteThought } = require('../../controllers/thoughtController')

// route to get all thoughts and create a thought
router.route('/').get(getAllThoughts).post(createThought)

// route to get thought by ID, update and delete thought
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought)

// route to add a reaction to a thought
router.route('/:thoughtId/reactions').post(addReaction)

// route to delete a reaction to a thought
router.route('/:thoughtId/:reactionId').delete(removeReaction)

module.exports = router