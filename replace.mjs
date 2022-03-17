import fs from 'fs';
import path from 'path';

let searchDirectory = './_site/assets';

const findImages = (directory) => {
  let images = fs.readdirSync(directory);
  images = images.filter((file) => {
    return (
      path.extname(file) === '.jpg' ||
      path.extname(file) === '.jpeg' ||
      path.extname(file) === '.gif' ||
      path.extname(file) === '.png'
    );
  });
  console.log(images);
  return images;
};

const buildImageMap = (images) => {
  let regex = /(?<=-)(.*?)(?=\.)/;
  return images.map((image) => {
    return {
      id: regex.exec(image)[1],
      url: image,
    };
  });
};

const findFiles = (directory) => {
  let files = fs.readdirSync(directory);
  files = files.filter((file) => {
    return path.extname(file) === '.js';
  });
  console.log(files);
  return files;
};

const findMatchingImages = (files, images) => {
  let contentArray = files.map((file) => {
    return fs.readFileSync(
      path.join(searchDirectory, file),
      'utf8',
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        return data;
      }
    );
  });

  contentArray = contentArray.map((file) => {
    let updatedFile;
    images.forEach((image) => {
      let imgReg = new RegExp(
        String.raw`(?<=")http[s](.*)${image.id}(.*)(?=")`,
        'g'
      );
      let imgPath = path.join('/assets/', image.url);
      if (file.includes(image.id)) {
        file = file.replace(imgReg, imgPath);
      }
      updatedFile = file;
    });
    return updatedFile;
  });
  return contentArray;
};

let images = buildImageMap(findImages(searchDirectory));
let files = findFiles(searchDirectory);
let fileArray = findMatchingImages(files, images);

files.forEach((file, i) => {
  let newPath = path.join(searchDirectory, file);
  fs.writeFileSync(newPath, fileArray[i]);
});
