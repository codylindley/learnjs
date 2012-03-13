//https://github.com/nzakas/professional-javascript/blob/master/professional-javascript3/Ch18/CrossBrowserXPathExample01.htm
//Cross-Browser XPath Example
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
       
function serializeXml(xmldom){
   
    if (typeof XMLSerializer != "undefined"){
        return (new XMLSerializer()).serializeToString(xmldom);
 
    } else if (typeof xmldom.xml != "undefined"){
        return xmldom.xml;
    } else {
        throw new Error("Could not serialize XML DOM.");
    }
}

function parseXml(xml){
    var xmldom = null;
    
    if (typeof DOMParser != "undefined"){
        xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
        var errors = xmldom.getElementsByTagName("parsererror");
        if (errors.length){
            throw new Error("XML parsing error:" + errors[0].textContent);
        }         
    } else if (typeof ActiveXObject != "undefined"){
        xmldom = createDocument();
        xmldom.loadXML(xml);
        if (xmldom.parseError != 0){
            throw new Error("XML parsing error: " + xmldom.parseError.reason);
        }
    } else {
        throw new Error("No XML parser available.");
    }
    
    return xmldom;
}          

function selectSingleNode(context, expression, namespaces){
    var doc = (context.nodeType != 9 ? context.ownerDocument : context);
    
    if (typeof doc.evaluate != "undefined"){
        var nsresolver = null;
        if (namespaces instanceof Object){
            nsresolver = function(prefix){
                return namespaces[prefix];
            };
        }
        
        var result = doc.evaluate(expression, context, nsresolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return (result !== null ? result.singleNodeValue : null);
    
    } else if (typeof context.selectSingleNode != "undefined"){

        //create namespace string
        if (namespaces instanceof Object){
            var ns = "";
            for (var prefix in namespaces){
                if (namespaces.hasOwnProperty(prefix)){
                    ns += "xmlns:" + prefix + "='" + namespaces[prefix] + "' ";
                }
            }
            doc.setProperty("SelectionNamespaces", ns);
        }
        return context.selectSingleNode(expression);
    } else {
        throw new Error("No XPath engine found.");
    }
}
    


    var xmldom = parseXml("<?xml version=\"1.0\"?><wrox:books xmlns:wrox=\"http://www.wrox.com/\"><wrox:book><wrox:title>Professional JavaScript for Web Developers</wrox:title><wrox:author>Nicholas C. Zakas</wrox:author></wrox:book><wrox:book><wrox:title>Professional Ajax</wrox:title><wrox:author>Nicholas C. Zakas</wrox:author><wrox:author>Jeremy McPeak</wrox:author><wrox:author>Joe Fawcett</wrox:author></wrox:book></wrox:books>");
    
    var result = selectSingleNode(xmldom.documentElement, "wrox:book/wrox:author", { wrox: "http://www.wrox.com/" });            
    print(serializeXml(result));            
