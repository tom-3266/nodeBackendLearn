const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWARES

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .send({ message: 'Hello from the server side...', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send({ message: 'You can post to this api' });
// });

//ROUTE HANDLER
//IMPLEMENTED IN SEPARATE FILE IN RUTER FOLDER
//ROUTES
//IMPLEMENTED IN SEPARATE FILE IN RUTER FOLDER
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getToursById);
// app.post('/api/v1/tours', createNewTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//MOUNTING THE ROUTER
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
