const express = require('express');
const router = express.Router();
const {
  getAllTours,
  getTour,
  addNewTour,
  updateTour,
  deleteTour,
  checkID,
  checkPostBody,
} = require('../Controller/TourController');

router.param('id', checkID); // Custom middleware to validate param as value or not

router.route('/').get(getAllTours).post(checkPostBody, addNewTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
