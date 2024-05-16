const fs = require('fs');
const Tour = require('./../model/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// exports.checkId = (req, res, next, val) => {
//   const id = req.params.id * 1;
//   console.log(`The route ID is ${val}`);
//   if (id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'no data found',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     res.status(400).json({
//       status: 'fail',
//       message: 'Name or price is missing',
//     });
//   }
//   next();
// };

exports.aliasTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,difficulty,price,ratingsAverage';
  next();
};

exports.getAllTours = async (req, res) => {
  console.log('get all tours run at ' + req.requestTime);
  console.log(req.query);

  try {
    // const equeryVals = { ...req.query };
    // const excludedVals = ['page', 'sort', 'limit', 'fields'];
    // excludedVals.forEach((el) => delete equeryVals[el]);

    // //Advanced Filtering
    // let queryStr = JSON.stringify(equeryVals);
    // queryStr = queryStr.replace(
    //   /\b(gte|gt|lte|lt)\b/g,
    //   (match) => `$${match}`,
    // );
    // let query = Tour.find(JSON.parse(queryStr));

    // if (req.query.sort) {
    //   const sortby = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortby);
    // }

    // if (req.query.fields) {
    //   const field = req.query.fields.split(',').join(' ');
    //   query = query.select(field);
    // }

    // const page = req.query.page * 1;
    // const limit = req.query.limit * 1;
    // const skip = (page - 1) * limit;

    // query = query.skip(skip).limit(limit);

    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const tours = await features.query;
    res.status(200).json({
      status: 'success',
      requestTime: req.requestTime,
      results: tours.length,
      data: { tours }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: 'invalid request'
    });
  }
};

exports.getToursById = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: { tour }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createNewTour = async (req, res) => {
  //   console.log(req.body);
  // const id = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: id }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/../dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     if (err) {
  //       res.status(400).json({
  //         message: 'no file available',
  //       });
  //       return;
  //     }

  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data'
    });
  }
  //   },
  // );
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
        runValidators: true
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid data'
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Unable to delete'
    });
  }
};

exports.statusTour = async (res, req) => {
  try {
    const stats = Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      }
    ]);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Unable to fetch'
    });
  }
};
