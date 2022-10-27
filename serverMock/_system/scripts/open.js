const { platform } = require('os');
const { exec } = require('child_process');
const logger = require('../lib/Logger');

const osPlatform = platform();

const port = process.argv[2];

if (!port) {
  logger.warn('should set the port to open');
  process.exit(0);
}

if (isNaN(port)) {
  logger.warn('should set a numeric port');
  process.exit(0);
}

let command;

if (osPlatform === 'win32') command = `start http://localhost:${port}`;
if (osPlatform === 'darwin') command = `open http://localhost:${port}`;

if (!command) process.exit(0);

exec(command);

process.exit(0);