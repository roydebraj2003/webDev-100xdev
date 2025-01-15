const { program } = require('commander');
const fs = require('fs');
program
  .command('file <wordToReplace> <filePath>')
  .option('-r, --replace <string>', 'Replace a word in the file')
  .option('-f, --find <string>', 'Find a word in the file')
  .action((wordToReplace, filePath, options) => {
    if (options.replace) {
      promisifiedReadFile(filePath)
        .then((data) => {
          const replacedData = data.replaceAll(wordToReplace, options.replace);
                    promisifiedWriteFile(filePath, replacedData)
            .then(() => {
              console.log('File updated successfully!');
            })
            .catch((error) => {
              console.log('Error writing to file:', error);
            });
        })
        .catch((error) => {
          console.log('Error reading file:', error);
        });
    }
  });

const promisifiedReadFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const promisifiedWriteFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, 'utf-8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

program.parse(process.argv);
