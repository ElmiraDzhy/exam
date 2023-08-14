const fs = require('fs');
const path = require('path');

function logError(error) {
  const logDirectory = path.join(__dirname, '..', 'logs');

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  const logFilePath = path.join(logDirectory, 'buffer');

  const logEntry = {
    message: error.message || '',
    time: Date.now(),
    code: error.code || 0,
    stackTrace: error.stack ? { error: error.stack } : {},
  };

  const logString = JSON.stringify(logEntry, null) + '\n';

  fs.appendFile(logFilePath, logString, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

module.exports = logError;
