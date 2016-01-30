// Copyright 2004-present Facebook. All Rights Reserved.
'use strict';

var SourceMapConsumer = require('source-map').SourceMapConsumer;
var fs = require('fs');

var argv = process.argv.slice(2);
if (argv.length < 2) {
  console.error('Usage: ' + __filename + ' <source-map-file> <lineNumber> [column]');
  process.exit(1);
}

var fileName = argv[0];
var lineNumber = Number(argv[1]);
var column = Number(argv[2]);

var content = fs.readFileSync(fileName, 'utf8');
var sourceMapInstance = new SourceMapConsumer(content);
var original = sourceMapInstance.originalPositionFor({
  line: lineNumber,
  column: column,
});

console.log(original.source + ':' + original.line);