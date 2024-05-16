const express = require('express');
const fs = require('fs');
const tourController = require(`./../controllers/tourController.js`);
const router = express.Router();

// router.param('id', tourController.checkId);

router
  .route('/top-5-cheapest')
  .get(tourController.aliasTours, tourController.getAllTours);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createNewTour);
router
  .route('/:id')
  .get(tourController.getToursById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
