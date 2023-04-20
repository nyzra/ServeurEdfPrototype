import {test} from "./test.js"


let circles =["Tick","Green","Red","Orange","DarkOrange"]
let startName = ".linkTo"
let endName="Circle"
circles.forEach((value)=>{
    
    let backgroundClass= "."+value+"Background"
    let circleClass = '.circle'+backgroundClass

    let linkedClass=startName+value +endName


        $(linkedClass).hover(function() {   
          $(circleClass).addClass('active');
        }, function() {
          // on mouseout, reset the background colour
          $(circleClass).removeClass('active');
        });
      
})

