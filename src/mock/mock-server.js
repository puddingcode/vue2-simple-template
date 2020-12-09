const Mock = require('mockjs');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');
const chokidar = require('chokidar');

// Node.js 进程的当前工作目录
console.log(process.cwd());
const mockDir = path.join(process.cwd(), 'mock');

function registerRoutes(app) {
  let mockLastIndex;
  const { mocks } = require('./index');
}
