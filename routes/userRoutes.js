const express = require('express');

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This user is not yet implemented',
  });
};
const getUsersById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This user is not yet implemented',
  });
};
const createNewUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'User addition is not yet implemented',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'User updation is not yet implemented',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'User deletion is not yet implemented',
  });
};

const router = express.Router();

router.route('/').get(getAllUsers).post(createNewUser);
router
  .route('/:id')
  .get(getUsersById)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
