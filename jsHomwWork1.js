function handleArgType(arg) {
  var stringMethodsName = "stringMethods",
  numberMethodsName = "numberMethods",
  arrayMethodsName = "arrayMethods";
  function emptyArgLogger(argType) {
    return console.log("empty "+ argType +" is not a representative argument for test methods")
  }
  function handleMethodArrays(methodsObj, arg) {
    function getRandomNumber(int) {
      var random = Math.floor(Math.random() * (int - 1));
      return random;
    };
    function getRandomString(int) {
      var text;
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < int; i++ )
      text += possible.charAt(getRandomNumber(possible.length - 1));
      
      return text;		
    };
    function getArgPart(argLength, method) {
      var randomChar1 = getRandomNumber(argLength),
      randomChar2 = getRandomNumber(argLength),
      part,
      result = [];
      if (randomChar1 > randomChar2) {
        part = arg[method](randomChar2, randomChar1);
        otherArgs = randomChar2 + "," + randomChar1;
        result.push(part, randomChar2, randomChar1);
      } else if (randomChar1 < randomChar2) {
        part = arg[method](randomChar1, randomChar2)
        result.push(part, randomChar1, randomChar2);
      }  else {
        randomChar1 = randomChar1 + getRandomNumber(argLength - (1 + randomChar1));
        part = arg[method](randomChar2, randomChar1);
        result.push(part, randomChar2, randomChar1);
      }
      return result;
    };
    function arrayStringify(array) {
      return "['" + array.join("','") + "']";
    };
    var methodArrayLength = methodsObj.methodArray.length,
        result,
        argLength,
        otherArgs;
    switch (methodsObj.name) {
      case stringMethodsName:
      argLength = arg.length;
      if (argLength === 0) {
        emptyArgLogger("string");
      } else {
      var argRandomCharIndex = getRandomNumber(argLength),
      argPart;
      for (var i = 0; i < methodArrayLength; i++) {
        if (i === 0 || i === 1) { //charAt, charcodeAt
          result = arg[methodsObj.methodArray[i]](argRandomCharIndex);
          methodLogger(arg, methodsObj.methodArray[i], argRandomCharIndex, result);
        } else if (i === 2 || i === 6) { //concat, localCompare
          var randomString = getRandomString(getRandomNumber(15)),
          result = arg[methodsObj.methodArray[i]](randomString);
          methodLogger(arg, methodsObj.methodArray[i], randomString, result);
        } else if (i === 3) { //fromCharCode
          var resultStringLength = getRandomNumber(25),
          unicodeEnCharsUpperLength = 90-65,
          unicodeResultChars = [];
          for (var i = 0; i < resultStringLength; i++) {
            var unicdeCharCode = 64 + getRandomNumber(25);
            unicodeResultChars.push(unicdeCharCode)
            result += String.fromCharCode(unicdeCharCode);
          }
          methodLogger(arg, methodsObj.methodArray[i], unicodeResultChars.toString(), result, "String");
        } else if (i === 4 || i === 5 || i === 7 || i === 9) { //indeOf, lastIndexOf, match, search
          var argPart = getArgPart(argLength, methodsObj.methodArray[10]);
          result = arg[methodsObj.methodArray[i]](argPart[0]);
          methodLogger(arg, methodsObj.methodArray[i], argPart[0], result);
        } else if (i === 8) { //replace
          argPart = getArgPart(argLength, methodsObj.methodArray[10]);
          var randomString = getRandomString(getRandomNumber(10));
          result = arg[methodsObj.methodArray[i]](argPart, randomString);
          methodLogger(arg, methodsObj.methodArray[i], argPart, result);
          } else if (i === 10) {//slice, 
            argPart = getArgPart(argLength, methodsObj.methodArray[i]);
            otherArgs = argPart[1]+ "," +argPart[2];
            methodLogger(arg, methodsObj.methodArray[i], otherArgs, argPart[0]);
          } else if (i === 11) { //split
            otherArgs = arg.charAt(argRandomCharIndex);
            result = arg[methodsObj.methodArray[i]](otherArgs);
            methodLogger(arg, methodsObj.methodArray[i], otherArgs, result);
          } else if (i === 12) { //substr
            argPart = getArgPart(argLength, methodsObj.methodArray[12]);
            methodLogger(arg, methodsObj.methodArray[i], argPart[1]+ "," +argPart[2], argPart[0]);
          } else if (i === 13) { //substring
            argPart = getArgPart(argLength, methodsObj.methodArray[13]);
            methodLogger(arg, methodsObj.methodArray[i], argPart[1]+ "," +argPart[2], argPart[0]);
          } else { //"toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toString", "toUpperCase", "trim", "valueOf"
          result = arg[methodsObj.methodArray[i]]();
          methodLogger(arg, methodsObj.methodArray[i], "", result);
        }
      }
      };
      break;
      case numberMethodsName:
      for (var i = 0; i < methodArrayLength; i++) {
        if (i === 1 || i === 2 || i === 3) { //"toExponential","toFixed","toPrecision"
          var intString = arg.toString(),
              intStringLength = intString.length;
              otherArgs = getRandomNumber(intStringLength);
              if (otherArgs === 0) {
                otherArgs = 1;
                }
          result = arg[methodsObj.methodArray[i]](otherArgs);
          methodLogger(arg, methodsObj.methodArray[i], otherArgs, result);  
        } else { //"valueOf,"toString"
          result = arg[methodsObj.methodArray[i]]();
          methodLogger(arg, methodsObj.methodArray[i], "", result);
        }
        
      }
      break;
      case arrayMethodsName:
      argLength = arg.length;
      if (argLength === 0) {
        emptyArgLogger("Array");
      } else {
        var argCopy;
      for (var i = 0; i < methodArrayLength; i++) {
        if (i === 0) { //concat
          argCopy = arg.slice();
          result = argCopy[methodsObj.methodArray[i]](arg);
          methodLogger(arrayStringify(arg), methodsObj.methodArray[i], arrayStringify(arg), arrayStringify(result));
        } else if (i === 1 || i === 3 || i === 5 || i === 12) { //indexOf, lastIndexOf, push, unshift
          argCopy = arg.slice();
          var randomArgMember = argCopy[getRandomNumber(argLength)];
          result = argCopy[methodsObj.methodArray[i]](randomArgMember);
          if (typeof randomArgMember === "object") {
            randomArgMember = randomArgMember.toString();
          } else if (randomArgMember instanceof Array) {
            randomArgMember = arrayStringify(result);
          }
          methodLogger(arrayStringify(arg), methodsObj.methodArray[i], randomArgMember, result);
        } else if (i === 8) { //slice
          var resultArr = getArgPart(argLength, methodsObj.methodArray[i]);
          result = arrayStringify(resultArr[0]);
          otherArgs = resultArr[1] + "," + resultArr[2];
          methodLogger(arrayStringify(arg), methodsObj.methodArray[i], otherArgs, result);
        } else if (i === 10) { //splice
          argCopy = arg.slice();
          var newMemeber = getRandomNumber(15),
              randomArgPosition = getRandomNumber(argLength),
              randomMemberRemove = getRandomNumber(argLength);
          result = argCopy[methodsObj.methodArray[i]](randomArgPosition, randomMemberRemove, newMemeber);
          methodLogger(arrayStringify(arg), methodsObj.methodArray[i], randomArgPosition+","+randomMemberRemove+","+newMemeber, arrayStringify(result));
        } else if (i === 4 || i === 7) { //pop, shift
          argCopy = arg.slice();
          result = argCopy[methodsObj.methodArray[i]]();
          methodLogger(arrayStringify(arg), methodsObj.methodArray[i], "", result);
        }
         else { //join, reverse, sort, toString, valuOf
         argCopy = arg.slice();
          result = argCopy[methodsObj.methodArray[i]]();
          if (i === 6 || i === 9) {
            result = arrayStringify(result);
          }
          methodLogger(arrayStringify(arg), methodsObj.methodArray[i], "", result);
        }
        }
      };
      break;
    }
    
  };
  
  function methodLogger(arg, methodName, otherArgs, result, altArg) {
    if (typeof arg === "object") {
      return console.log("___________\n Log for Array method " + methodName + ":\n Argument: " + arg + "\n Using: " + arg + "." + methodName + "(" + otherArgs + ");\n Result: " + result);
    
    } else if (typeof arg === "string" && altArg !== undefined) {
      return console.log("___________\n Log for " + typeof arg + " method " + methodName + ":\n Argument: " + arg + "\n Using: " + altArg + "." + methodName + "(" + otherArgs + ");\n Result: " + result);
    } else {
      return console.log("___________\n Log for " + typeof arg + " method " + methodName + ":\n Argument: " + arg + "\n Using: " + arg + "." + methodName + "(" + otherArgs + ");\n Result: " + result);
    }
  };
  if (typeof arg === "string") {
    
    var stringMethods = {
      methodArray: ["charAt", "charCodeAt", "concat", "fromCharCode", "indexOf", "lastIndexOf", "localeCompare", "match", "replace", "search", "slice", "split", "substr", "substring", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toString", "toUpperCase", "trim", "valueOf"],
      name: stringMethodsName
    }
    handleMethodArrays(stringMethods, arg);
  } else if (typeof arg === "number") {
    var numberMethods = {
      methodArray: ["toString","toExponential","toFixed","toPrecision","valueOf"],
      name: numberMethodsName
    }
    handleMethodArrays(numberMethods, arg);
  } else if (arg instanceof Array) {
    var arrayMethods = {
      methodArray: ["concat","indexOf","join","lastIndexOf","pop","push","reverse","shift","slice","sort","splice","toString","unshift","valueOf"],
      name: arrayMethodsName
    }
    handleMethodArrays(arrayMethods, arg);
  } else {
    console.log("such argument functon is not supported, pleae enter as argument string or number  or array");
  };
};