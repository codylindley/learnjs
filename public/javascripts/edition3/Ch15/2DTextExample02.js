//https://github.com/nzakas/professional-javascript/blob/master/professional-javascript3/Ch15/2DTextExample02.htm
//Canvas Text Example
window.onload = function(){
    var drawing = document.getElementById("drawing");
    
    //make sure <canvas> is completely supported
    if (drawing.getContext){
    
        var context = drawing.getContext("2d");
        
        //start the path
        context.beginPath();
        
        //draw outer circle
        context.arc(100, 100, 99, 0, 2 * Math.PI, false);
        
        //draw inner circle
        context.moveTo(194, 100);
        context.arc(100, 100, 94, 0, 2 * Math.PI, false);
        
        //draw hour hand
        context.moveTo(100,100);
        context.lineTo(100, 15);
        
        //draw minute hand
        context.moveTo(100, 100);
        context.lineTo(35, 100);
        
        context.stroke();
        
        //add some text - not supported by all browsers
        if (context.strokeText){
            
            //normal
            context.font = "bold 14px Arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText("12", 100, 20);
            
            //start-aligned
            context.textAlign = "start";
            context.fillText("12", 100, 40);
            
            //start-aligned
            context.textAlign = "end";
            context.fillText("12", 100, 60);
            
            
        } else {
            print("Your browser doesn't support the canvas text API.");
        }
    }                
};

    