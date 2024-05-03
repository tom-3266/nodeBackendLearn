const express = require('express');
const userController = require('./../controllers/userController.js');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createNewUser);
router
  .route('/:id')
  .get(userController.getUsersById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
