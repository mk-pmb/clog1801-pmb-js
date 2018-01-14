
<!--#echo json="package.json" key="name" underline="=" -->
clog1801-pmb
============
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Yet another console logger
<!--/#echo -->


Usage
-----

from [test.usage.js](test.usage.js):

<!--#include file="test.usage.js" outdent="  " code="javascript"
  start="  // #BEGIN# usage demo" stop="  // #ENDOF# usage demo" -->
<!--#verbatim lncnt="26" -->
```javascript
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
```


<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
