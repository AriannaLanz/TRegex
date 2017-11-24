require('./partialMatchParser');

var regex = new RegExp('AB{3}');
var input = 'A';
var partialMatchRegex = regex.toPartialMatchRegex();
var result = partialMatchRegex.exec(input);
var matchType = regex.exec(input) ? "Full match" : result && result[0] ? "Partial match" : "No match";


var regex = new RegExp('HE|LL|O+');
var input = '';
var partialMatchRegex = regex.toPartialMatchRegex();
var result = partialMatchRegex.exec(input);
var matchType = regex.exec(input) ? "Full match" : result && result[0]  ? "Partial match" : "No match";

console.log(result);
console.log(matchType);



