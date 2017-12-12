require('./globals');
var base = process.env.PWD;

let JasmineConsoleReporter = require('jasmine-console-reporter');
let consoleReporter = new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2
    cleanStack: 1,       // (0|false)|(1|true)|2|3
    verbosity: 4,        // (0|false)|1|2|(3|true)|4
    listStyle: 'indent', // "flat"|"indent"
    activity: false
});

var reporters = require('jasmine-reporters');
var junitReporter = new reporters.JUnitXmlReporter({
    savePath: base+"/jasmine-reports",
    consolidateAll: false
});

jasmine.getEnv().addReporter(consoleReporter);
jasmine.getEnv().addReporter(junitReporter);