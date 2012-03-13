//https://github.com/nzakas/professional-javascript/blob/master/professional-javascript3/Ch05/BooleanTypeExample01.htm
//Boolean Type Example
    
var falseObject = new Boolean(false);
var result = falseObject && true;
print(result);  //true

var falseValue = false;
result = falseValue && true;
print(result);  //false

print(typeof falseObject);   //object
print(typeof falseValue);    //boolean
print(falseObject instanceof Boolean);  //true
print(falseValue instanceof Boolean);   //false

    