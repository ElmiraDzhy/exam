const fs = require('fs');
const path = require('path');

function processLogs() {
  const logDirectory = path.join(__dirname, '..', 'logs');
  const bufferFilePath = path.join(logDirectory, 'buffer');

  const now = new Date();
  const timestamp = now.getTime();

  const newLogFilePath = path.join(logDirectory, `log_${timestamp}.json`);

  if (fs.existsSync(bufferFilePath)) {
    fs.readFile(bufferFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading buffer file:', err);
        return;
      }

      const logs = data.trim().split(/\n(?={)/).map(entry => {
        const sanitizedEntry = entry.replace(/"stackTrace":{(.*?)}/g, (_, stackTrace) => {
          return `"stackTrace":{${stackTrace.replace(/\n/g, '\\n')}}`;
        });
        return JSON.parse(sanitizedEntry);
      });

      const newLogs = logs.map(log => ({
        message: log.message,
        code: log.code,
        time: log.time,
      }));

      fs.writeFile(newLogFilePath, JSON.stringify(newLogs, null, 2), (err) => {
        if (err) {
          console.error('Error writing new log file:', err);
        } else {
          console.log('Logs moved to new file:', newLogFilePath);
          fs.writeFileSync(bufferFilePath, '');
        }
      });
    });
  }
}

module.exports = processLogs;
