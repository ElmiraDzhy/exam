const http = require('http');
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');

const router = require('./router');
const offerRouter = require('./router/offerRouter.js');
const chatRouter = require('./router/chatRouter');
const contestRouter = require('./router/contestRouter');

const controller = require('./socketInit');
const handlerError = require('./handlerError/handler');
const processLogs = require('./utils/logProcessor');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(offerRouter);
app.use(chatRouter);
app.use(contestRouter);
app.use(handlerError);
app.use('/public', express.static('public/'));

cron.schedule('0 2 * * *', () => {
  processLogs();
});

const server = http.createServer(app);
server.listen(PORT,
  () => console.log(`Example app listening on port ${ PORT }!`));
controller.createConnection(server);


