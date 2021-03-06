//https://github.com/nzakas/professional-javascript/blob/master/professional-javascript3/Ch07/ClosureExample01.htm
//Closure Example

    function createFunctions(){
        var result = new Array();
        
        for (var i=0; i < 10; i++){
            result[i] = function(){
                return i;
            };
        }
        
        return result;
    }
    
    var funcs = createFunctions();
    
    //every function outputs 10
    for (var i=0; i < funcs.length; i++){
        document.write(funcs[i]() + "<br />");
    }

