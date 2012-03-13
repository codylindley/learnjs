//https://github.com/nzakas/professional-javascript/blob/master/professional-javascript3/Ch18/IEXmlDomExample3.htm
//IE XML DOM Example
    
function createDocument(){
    if (typeof arguments.callee.activeXString != "string"){
        var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0",
                        "MSXML2.DOMDocument"];

        for (var i=0,len=versions.length; i < len; i++){
            try {
                var xmldom = new ActiveXObject(versions[i]);
                arguments.callee.activeXString = versions[i];
                return xmldom;
            } catch (ex){
                //skip
            }
        }
    }

    return new ActiveXObject(arguments.callee.activeXString);
}
    
var xmldom = createDocument();
xmldom.async = false;
xmldom.load("example.xml");

if (xmldom.parseError != 0){
    print("An error occurred:\nError Code: "
          + xmldom.parseError.errorCode + "\n"
          + "Line: " + xmldom.parseError.line + "\n"
          + "Line Pos: " + xmldom.parseError.linepos + "\n"
          + "Reason: " + xmldom.parseError.reason);
} else {

    print(xmldom.documentElement.tagName);  //"root"
    print(xmldom.documentElement.firstChild.tagName); //"child"
    
    var anotherChild = xmldom.createElement("child");
    xmldom.documentElement.appendChild(anotherChild);
    
    var children = xmldom.getElementsByTagName("child");
    print(children.length);   //2        
    
    print(xmldom.xml);        

}


    