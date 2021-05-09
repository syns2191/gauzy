let fs = require('fs');
const { exec, execSync } = require('child_process');

if (fs.existsSync('../package.json')) {
  var package = require('../package.json');
  let currentVersion = package.version;

  exec('git tag --sort=committerdate | tail -1', (error, stdout) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    let newVersion = stdout.trim();
    package.version = newVersion;
    fs.writeFileSync('../package.json', JSON.stringify(package, null, 2));

    execSync("git commit -am 'Bump version '" + newVersion);

    console.log('Version updated', currentVersion, '=>', newVersion);
  });
}