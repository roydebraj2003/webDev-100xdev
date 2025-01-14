const fs = require('fs');

const readFilePromise = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const cleanFile = (data) => {
    data = data.trim();
    return data;
};

const writeFilePromise = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('File written successfully!');
            }
        });
    });
};

// Read the file, clean its contents, and then write back the cleaned data
readFilePromise('clean.txt')
    .then(cleanFile)
    .then(cleanedData => writeFilePromise('clean.txt', cleanedData))
    .then(result => console.log(result))
    .catch(err => console.error('Error:', err));
