const fs = require('fs');
const path = require('path');

function clean(dirname) {
  let files = [];
  if (fs.existsSync(dirname)) {
    files = fs.readdirSync(dirname);
    files.forEach((file) => {
      const curPath = `${dirname}/${file}`;
      if (fs.statSync(curPath).isDirectory()) {
        fs.deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirname);
  }
}

try {
  clean(path.resolve(__dirname, 'lib'));
  clean(path.resolve(__dirname, 'assets'));
  clean(path.resolve(__dirname, 'style'));
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(err);
}
