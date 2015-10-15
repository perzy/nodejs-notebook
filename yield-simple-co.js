var fs = require("fs");
 function myReadFile(name){
return function(callback){
fs.readFile(name, callback);
}    
}
var myF  = function*(){
     var p1=yield myReadFile("a.txt");
     var p2=yield myReadFile("b.txt");
     console.log(p1+":"+p2);
}
var gen = myF();
 // 第一次调用next 
 gen.next().value(function(err,result){
 gen.next(result).value(function(err,result2){
g.next(result2);
 });
 });


 var fs = require("fs");

 function myReadFile(name){
return function(callback){
fs.readFile(name, callback);
}    
}
function co(generator) {
  return function() {
    var gen = generator();
    function next(err, result) {
        var step = gen.next(result);
        if (!step.done) {
    // 核心  next 会在异步读取文件完成的时候调用，  next 函数执行时候会开始下一次的yield 异步调用，最
            step.value(next);
        } 
    }
    next();
   }
}
co(function*(){
     var p1=yield myReadFile("a.txt");
     var p2=yield myReadFile("b.txt");
     console.log(p1+":"+p2);
})();
