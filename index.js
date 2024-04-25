const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');
const { reject } = require('superagent/lib/request-base');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Could not find that file');
      resolve(data);
    });
  });
};

const writeFilePro = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('dog-image.txt', data, (err) => {
      if (err) reject('Some error has occured');
      resolve('Dog image added to file');
    });
  });
};

//const a = promise.all(a,b,c);
//console.log(a) this will contain the resolve of all 3 promises

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed : ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return writeFilePro(res.body.message);
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(data);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    await writeFilePro(res.body.message);
  } catch (err) {
    console.log(err);
  }
};
getDogPic();

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, data) => {
//       if (err) return console.log(err.message);
//       console.log(data.body.message);
//       fs.writeFile('dog-image.txt', data.body.message, (err) => {
//         if (err) return console.log(err);
//         console.log('dog image added');
//       });
//     });
