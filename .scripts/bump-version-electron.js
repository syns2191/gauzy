
const fs = require('fs');
const { exec, execSync } = require('child_process');

module.exports.desktop = () => {
    if (fs.existsSync('./apps/desktop/src/package.json')) {
        let package = require('../apps/desktop/src/package.json');
        let currentVersion = package.version;
    
        exec('git tag --sort=committerdate | tail -1', (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
    
        let newVersion = stdout.trim();
        if (newVersion) {
            newVersion = newVersion.split('v')[1];
        }
        package.version = newVersion;
        fs.writeFileSync('./apps/desktop/src/package.json', JSON.stringify(package, null, 2));
    
        let updated = require('../apps/desktop/src/package.json');
        console.log('Version updated', currentVersion, '=>', updated.version);
        });
    }
}

module.exports.desktoptimer = () => {
    if (fs.existsSync('./apps/desktop-timer/src/package.json')) {
        let package = require('../apps/desktop-timer/src/package.json');
        let currentVersion = package.version;

        exec('git fetch --tags && git describe --tags `git rev-list --tags --max-count=1`', (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
    
        let newVersion = stdout.trim();
        console.log('latest tag', newVersion);
        if (newVersion) {
            newVersion = newVersion.split('v')[1];
        }

        if (newVersion) {
            package.version = newVersion;
            fs.writeFileSync('./apps/desktop-timer/src/package.json', JSON.stringify(package, null, 2));
        
            let updated = require('../apps/desktop-timer/src/package.json');
            console.log('Version updated to version => ', updated.version);
        } else {
            console.log('latest tag not found. build with version', currentVersion);
        }
        });
    }
}
