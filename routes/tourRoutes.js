const express = require('express');
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: tours.length,
    data: { tours: tours },
  });
};

const getToursById = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'no data found',
    });
  }
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: { tour: tour },
  });
};

const createNewTour = (req, res) => {
  //   console.log(req.body);
  const id = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: id }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(400).json({
          message: 'no file available',
        });
        return;
      }
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'no data found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour here',
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'no data found',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const router = express.Router();

router.route('/').get(getAllTours).post(createNewTour);
router
  .route('/:id')
  .get(getToursById)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
