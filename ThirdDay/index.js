const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (fileName) =>
  new Promise((resolve, reject) => {
    return fs.readFile(fileName, (err, data) => {
      if (err) reject(`Unable to read data, ${fileName} file not found`);
      resolve(data);
    });
  });

const writeFilePromise = (fileName, information) =>
  new Promise((resolve, reject) => {
    return fs.writeFile(fileName, information, (err) => {
      if (err) reject(`unable to write data into the file ${fileName}`);
      resolve("completed");
    });
  });

const getDogImage = async () => {
  try {
    //read dog bread
    const data = await readFilePromise("./files/data.txt");
    console.log(`Breed ${data}`);
    //fetch image from api
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(`Image ${res.body.message}`);
    //write data into text file
    await writeFilePromise("./files/dogs-image.txt", res.body.message);
    console.log("Random dogs image saved into file");
  } catch (err) {
    throw err;
  }
  // async testing purpose
  return "=================Dag data restor process completed from Step 2=================";
};

const getDogImageMulti = async () => {
  try {
    //read dog bread
    const data = await readFilePromise("./files/data.txt");
    console.log(`Breed ${data}`);
    //fetch image from api
    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const alldata = await Promise.all([res1, res2, res3]);
    const image = alldata.map((x) => x.body.message);
    console.log(`Image ${image}`);
    //write data into text file
    await writeFilePromise("./files/dogs-image.txt", image.join("\n"));
    console.log("Random dogs image saved into file");
  } catch (err) {
    throw err;
  }
  // async testing purpose
  return "=================Dag data restor process completed from Step 2=================";
};
// type 1 implementing calls - direct implementation
/*
readFilePromise("./files/data.txt")
  .then((data) => {
    console.log(`Breed ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    writeFilePromise("./files/dogs-image.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dogs image saved into file");
  })
  .catch((error) => {
    console.log(`execption - ${error}`);
  });
*/

/*
// type 2 implementing call using then in promise method
console.log("=================Step 1, started=================");
getDogImage()
  .then((x) => {
    console.log(x);
    console.log("=================Step 3, end=================");
  })
  .catch((err) => {
    console.log(`execption - ${err}`);
  }); 
*/
//type 3 - implement call using async and await

(async () => {
  try {
    console.log("=================Step 1, started=================");
    const x = await getDogImageMulti();
    console.log(x);
    console.log("=================Step 3, end=================");
  } catch (err) {
    console.log(err);
  }
})();
