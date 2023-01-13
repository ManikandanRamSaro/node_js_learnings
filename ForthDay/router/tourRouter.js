const express = require('express');
const router = express.Router();
const {
  getAllTours,
  getTour,
  addNewTour,
  updateTour,
  deleteTour,
} = require('../Controller/TourController');

router.route('/').get(getAllTours).post(addNewTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
