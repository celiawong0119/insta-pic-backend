let fs = require('fs');
let path = require('path');

function resetDatabase() {
  const databasePath = path.join(__dirname, './src/database/database.json');
  fs.writeFile(databasePath, JSON.stringify({ users: [], posts: [] }), (err) => {
    if (err) {
      throw err;
    }
  });

  const imagePath = path.join(__dirname, './public');
  fs.readdir(imagePath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(imagePath, file), (err) => {
        if (err) throw err;
      });
    }
  });
}

resetDatabase();
