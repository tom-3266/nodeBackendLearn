const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../model/tourModel');
const fs = require('fs');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
console.log(`DB : ` + process.env.DATABASE);
console.log(typeof DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(`Error      :        ${err}`));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

const insertData = async () => {
  try {
    await Tour.insertMany(tours);
    console.log('Data successfully inserted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--delete') deleteData();
if (process.argv[2] === '--import') insertData();

console.log(process.argv);
