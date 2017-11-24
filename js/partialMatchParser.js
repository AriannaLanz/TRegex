//Credits to Lucas Trzesniewski on StackOverflow 
//https://stackoverflow.com/questions/22483214/regex-check-if-input-still-has-chances-to-become-matching/41580048#41580048

RegExp.prototype.toPartialMatchRegex = function() {
    "use strict";
    
    var re = this,
        source = this.source,
        i = 0;
    
    function process () {
        var result = "",
            tmp;

        function appendRaw(nbChars) {
            result += source.substr(i, nbChars);
            i += nbChars;
        };
        
        function appendOptional(nbChars) {
            result += "(?:" + source.substr(i, nbChars) + "|$)";
            i += nbChars;
        };

        while (i < source.length) {
            switch (source[i])
            {
                case "\\":
                    switch (source[i + 1])
                    {
                        case "c":
                            appendOptional(3);
                            break;
                            
                        case "x":
                            appendOptional(4);
                            break;
                            
                        case "u":
                            if (re.unicode) {
                                if (source[i + 2] === "{") {
                                    appendOptional(source.indexOf("}", i) - i + 1);
                                } else {
                                    appendOptional(6);
                                }
                            } else {
                                appendOptional(2);
                            }
                            break;
                            
                        default:
                            appendOptional(2);
                            break;
                    }
                    break;
                    
                case "[":
                    tmp = /\[(?:\\.|.)*?\]/g;
                    tmp.lastIndex = i;
                    tmp = tmp.exec(source);
                    appendOptional(tmp[0].length);
                    break;
                    
                case "|":
                case "^":
                case "$":
                case "*":
                case "+":
                case "?":
                    appendRaw(1);
                    break;
                    
                case "{":
                    tmp = /\{\d+,?\d*\}/g;
                    tmp.lastIndex = i;
                    tmp = tmp.exec(source);
                    if (tmp) {
                        appendRaw(tmp[0].length);
                    } else {
                        appendOptional(1);
                    }
                    break;
                    
                case "(":
                    if (source[i + 1] == "?") {
                        switch (source[i + 2])
                        {
                            case ":":
                                result += "(?:";
                                i += 3;
                                result += process() + "|$)";
                                break;
                                
                            case "=":
                                result += "(?=";
                                i += 3;
                                result += process() + ")";
                                break;
                                
                            case "!":
                                tmp = i;
                                i += 3;
                                process();
                                result += source.substr(tmp, i - tmp);
                                break;
                        }
                    } else {
                        appendRaw(1);
                        result += process() + "|$)";
                    }
                    break;
                    
                case ")":
                    ++i;
                    return result;
                    
                default:
                    appendOptional(1);
                    break;
            }
        }
        
        return result;
    }
    
    return new RegExp(process(), this.flags);
};


// Test code
// (function() {
//     document.write('<span style="display: inline-block; width: 60px;">Regex: </span><input id="re" value="^one (two)+ three"/><br><span style="display: inline-block; width: 60px;">Input: </span><input id="txt" value="one twotw"/><br><pre id="result"></pre>');
//     document.close();

//     var run = function() {
//         var output = document.getElementById("result");
//         try
//         {
//             var regex = new RegExp(document.getElementById("re").value);
//             var input = document.getElementById("txt").value;
//             var partialMatchRegex = regex.toPartialMatchRegex();
//             var result = partialMatchRegex.exec(input);
//             var matchType = regex.exec(input) ? "Full match" : result && result[0] ? "Partial match" : "No match";
//             output.innerText = partialMatchRegex + "\n\n" + matchType + "\n" + JSON.stringify(result);
//         }
//         catch (e)
//         {
//             output.innerText = e;
//         }
//     };

//     document.getElementById("re").addEventListener("input", run);
//     document.getElementById("txt").addEventListener("input", run);
//     run();
// }());

