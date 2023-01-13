const express = require('express');

const router = express.Router();
const {
  getAllTours,
  getTour,
  addNewTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} = require('../Controller/TourController');

//router.param('id', checkID); // Custom middleware to validate param as value or not

router.route('/top-5-place').get(aliasTopTours, getAllTours);

router.route('/').get(getAllTours).post(addNewTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
