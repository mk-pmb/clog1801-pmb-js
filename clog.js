/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, consLog = console.log.bind(console),
  dfLogLv = {
    emrg: -5,   // emergency warnings
    err: -3,
    warn: -2,
    oper: 0,    // (operational) whether it works, and maybe why not
    cfg:  1,    // (config) whether it works, and how
    misc: 2,    // most activity and info
    noisy: 3,
    debug: 4,
    snoop: 8,
    NSA: 9999,
  },
  strFmt = require('util').format,
  arSlc = Array.prototype.slice;

function isStr(x, no) { return (((typeof x) === 'string') || no); }
function isNum(x, no) { return ((x === +x) || no); }
function dfltNum(x, d) { return (x === +x ? x : d); }
function timeStr() { return (new Date()).toTimeString().substr(0, 8); }
function concatIf(a, b) { return ((a && b) ? a.concat(b) : (a || b)); }

function ignore() { return; }
ignore.isIgnore = true;
ignore.l8r = function () { return ignore; };


function wants(fac, msgLv) {
  var maxLv = fac.verbosity;
  if (!isNum(maxLv)) { throw new TypeError('verbosity must be a number'); }
  if (msgLv === true) { return true; }
  if (isStr(msgLv)) { msgLv = dfltNum(fac.levels[msgLv], msgLv); }
  if (isNum(msgLv)) { return (maxLv >= msgLv); }
  throw new Error('Unsupported log level: ' + msgLv);
}


EX = function makeLoggerFactory(cfg) {
  if (!cfg) { cfg = false; }
  var logLv = (cfg.logLevels || dfLogLv), fac;

  fac = function (lvl, pre, conv) {
    if (!wants(fac, lvl)) { return ignore; }
    var l = function () {
      var msg = arSlc.call(arguments);
      if (l.conv) { msg = msg.map(l.conv); }
      (cfg.logFunc || consLog)(timeStr() + ' ' + strFmt.apply(null,
        concatIf(l.pre, msg)) + (cfg.eol || ''));
    };
    l.pre = pre;
    l.conv = conv;
    l.isIgnore = false;
    l.l8r = function (pre, conv) {
      return fac(lvl, concatIf(l.pre, pre), conv || l.conv);
    };
    return l;
  };

  fac.verbosity = dfltNum(cfg.verbosity, logLv.misc);
  fac.wants = wants.bind(null, fac);
  fac.levels = logLv;

  Object.keys(logLv).forEach(function (lvName) {
    fac[lvName] = fac(logLv[lvName]);
  });


  return fac;
};


EX.defaultLogLevels = dfLogLv;







module.exports = EX;
