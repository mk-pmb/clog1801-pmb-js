/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

try { require('usnam-pmb'); } catch (ignore) {}
var equal = require('assert').deepStrictEqual, origConsLog = console.log;

function copyLog(msg) {
  if (arguments.length > 1) { throw new Error('Too many args'); }
  msg = msg.replace(/^\d{2}:\d{2}:\d{2} /, '24:60:60 ');
  copyLog.text += msg + '\n';
  //origConsLog.call(console, msg);
}
copyLog.text = '';
console.log = copyLog;

function expectStdout(ex) {
  equal(copyLog.text, ex);
  copyLog.text = '';
}


(function readmeDemo() {
  // #BEGIN# usage demo
  var makeLoggerFactory = require('clog1801-pmb'),
    log = makeLoggerFactory({ verbosity: 'misc' });

  equal(log.verbosity, log.levels.misc);

  // The log factory carries methods for the log levels:
  log.misc('Hello World');
  equal(log.misc.isIgnore, false);

  log.debug('beep');
  equal(log.debug.isIgnore, true);

  log.emrg('Emergency!!!1!!11!!!!');
  equal(log.emrg.isIgnore, false);

  // !! Caveat: !!
  // Once created, log funcs maintain their verbosity:
  log.verbosity = log.levels.debug;
  equal(log.debug.isIgnore, true);

  expectStdout([
    '24:60:60 Hello World\n',
    '24:60:60 Emergency!!!1!!11!!!!\n',
  ].join(''));
  // #ENDOF# usage demo
}());


console.log = origConsLog;









console.log("+OK usage demo test passed.");   //= "+OK usage demo test passed."
