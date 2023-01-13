const express = require('express');
const {
  getUser,
  getUsers,
  createNewUser,
  updateUser,
  deleteUser,
} = require('../Controller/UserController');
const router = express.Router();

router.route('/').get(getUsers).post(createNewUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
